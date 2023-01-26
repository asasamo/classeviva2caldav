import logger from "./misc/logger.js";
import { schedule } from "node-cron";

import User from "./api/User.js";

import client from "./DAVClient/client.js";

import _const from "./const.js";

const user = new User(process.env.USER_ID, process.env.PASSWORD)

// cron job
schedule(_const.cron || "* * * * *", async () => {
    logger.info("Starting cron job...")

    // Login
    await user.login()
        .then(user => {
            logger.info("Logged in as " + user.firstName + " " + user.lastName + ".");
        })
        .catch(error => {
            logger.debug(error)
            logger.error("Invalid credentials!");
            process.exit(1);
        });

    let eventsSent = 0;
    // Get the agenda
    await user.getAgenda(new Date(), new Date(Date.now() + _const.days * 24 * 60 * 60 * 1000))
        .then(agenda => {
            logger.log("Agenda retrieved");
            agenda.forEach(async e => {
                // Send the event to calendar
                await client.sendToCalendar(e)
                    .then((res) => {
                        logger.debug("Done");
                        eventsSent++;
                    }).catch(error => {
                        logger.error("Error sending the event to calendar: " + error);
                    });
            });
        })
        .catch(error => {
            logger.error("Error getting the agenda: " + error);
        });

    logger.log("Sent " + eventsSent + " new events to calendar.");
});