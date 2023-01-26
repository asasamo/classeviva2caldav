import logger from "../misc/logger.js";

import api from "./api.js";

import parseDate from "../misc/parseDate.js";

export default {

    get: (user, from, to) => {
        return api.get(`students/${user.uid}/agenda/all/${parseDate.dateToString(from)}/${parseDate.dateToString(to)}`);
    },

    // TODO
    getEventCode: (user, eventCode) => {
        if (!(eventCode in api.eventCodes)) {
            return new Promise((_, reject) => {
                reject("Invalid event code: " + eventCode);
            });
        }
        return api.get(`students/${user.uid}/agenda/${eventCode}/${from}/${to}`);
    }
}