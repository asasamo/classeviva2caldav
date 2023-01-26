import { createDAVClient } from "tsdav";
import genEvent from "./genEvent.js";
import db from "../db/db.js";
import logger from "../misc/logger.js";

// Create DAV client
logger.debug("Connecting to Google CalDAV server");
const client = await createDAVClient({
    serverUrl: 'https://apidata.googleusercontent.com/caldav/v2/',
    credentials: {
        tokenUrl: 'https://accounts.google.com/o/oauth2/token',
        username: process.env.GOOGLE_USER,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    authMethod: 'Oauth',
    defaultAccountType: 'caldav',
});

logger.log("Connected to DAV server!");

// Fetch all calendars
const allCalendars = await client.fetchCalendars();

// Find calendar with the specified name
const calendar = allCalendars.find(calendar => calendar.displayName === process.env.GOOGLE_CAL);

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