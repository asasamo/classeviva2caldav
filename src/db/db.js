import logger from '../misc/logger.js';

import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

// File path
const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'db.json');

const adapter = new JSONFile(file);
const db = new Low(adapter);

await db.read();
logger.log("Database loaded!");

// Set default data if file is empty
db.data ||= { agenda: [] };

export default {
    saveToDB: async function (e) {
        db.data.agenda.push({
            evtStart: e.evtStart,
            evtEnd: e.evtEnd,
            title: e.title,
            description: e.description,
            evtId: e.evtId,
            evtCode: e.evtCode
        });
        await db.write();
    },
    checkIfInDB: async function (event) {
        return db.data.agenda.some((e) => e.evtId === event.evtId);
    }
}