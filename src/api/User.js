import logger from '../misc/logger.js';
import api from './api.js';

import auth from './auth.js';
import agenda from './agenda.js';
import AgendaEvent from './AgendaEvent.js';

class User {
    constructor(id, password) {
        this.uid = null;
        this.id = id;
        this.password = password;
        this.firstName = null;
        this.lastName = null;

        this.isLogged = false;
        this.token = {
            token: null,
            expire: null,
            release: null
        }
    }

    login() {
        return new Promise((resolve, reject) => {
            if (!this.isLogged || this.token.expire < Date.now()) {
                logger.debug('Logging in...');

                auth.userLogin(this.id, this.password)
                    .then(response => {
                        logger.debug(`Logged in as ${response.data.firstName} ${response.data.lastName}.`);
                        logger.debug("Token: " + response.data.token);
                        this.firstName = response.data.firstName;
                        this.lastName = response.data.lastName;
                        this.token = {
                            token: response.data.token,
                            expire: response.data.expire,
                            release: response.data.release
                        };
                        this.isLogged = true;

                        this.uid = /\d+/.exec(this.id)[0]; // Extract the uid from the id (only numbers)

                        // Set the token as a default header
                        api.defaults.headers.common['Z-Auth-Token'] = this.token.token;

                        resolve(this);
                    })
                    .catch(error => {
                        logger.log("Error logging in: " + error);
                        this.isLogged = false;
                        reject(error);
                    });
            } else {
                logger.debug("Already logged in.");
                resolve(this);
            }
        });
    }

    getAgenda(from, to) {
        return new Promise((resolve, reject) => {
            logger.debug(`Getting agenda from ${from.toISOString()} to ${to.toISOString()}...`);
            agenda.get(this, from, to)
                .then(response => {
                    logger.debug("Got agenda.");
                    let agenda = [];
                    response.data.agenda.forEach(e => {
                        agenda.push(new AgendaEvent(e.evtId, e.evtCode, e.authorName, e.notes, new Date(e.evtDatetimeBegin), new Date(e.evtDatetimeEnd)));
                    });
                    resolve(agenda);
                })
                .catch(error => {
                    logger.error("Error getting agenda: " + error);
                    reject(error);
                });
        });
    }
}

export default User;