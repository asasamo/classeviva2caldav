import { createDAVClient } from "tsdav";
import genEvent from "./genEvent.js";
import db from "../db/db.js";
import logger from "../misc/logger.js";

// Create DAV client
logger.debug("Connectiong to DAV server: " + process.env.DAV_URL);
const client = await createDAVClient({
    serverUrl: process.env.DAV_URL,
    credentials: {
        username: process.env.DAV_USER,
        password: process.env.DAV_PASSWORD,
    },
    authMethod: 'Basic',
    defaultAccountType: 'caldav',
});

logger.log("Connected to DAV server!");

// Fetch all calendars
const allCalendars = await client.fetchCalendars();

// Find calendar with the specified name
const calendar = allCalendars.find(calendar => calendar.displayName === process.env.DAV_CAL);

if (!calendar) {
    throw new Error('Calendar not found');
}

export default {
    sendToCalendar: async function (event) {
        // Check if the event is already in the db
        if (!await db.checkIfInDB(event)) {
            logger.debug("Event not in db, adding it and sending to calendar...");

            await db.saveToDB(event);

            let evn = genEvent.genEvent(event);
            return client.createCalendarObject({
                calendar: calendar,
                iCalString: evn.string,
                filename: evn.uid + ".ics",
            });
        }
        else {
            logger.debug("Event already in db, not sending to calendar...");
        }
    }
}