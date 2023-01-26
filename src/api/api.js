import axios from 'axios';
import logger from '../misc/logger.js';

// headers from https://github.com/michelangelomo/Classeviva-Official-Endpoints/
const api = axios.create({
    baseURL: 'https://web.spaggiari.eu/rest/v1',
    headers: {
        'Content-Type': 'application/json',
        'Z-Dev-ApiKey': '+zorro+',
        'User-Agent': 'zorro/1.0'
    }
});

api.interceptors.request.use(config => {
    logger.request(`New request to ${config.url}`);
    return config;
});

api.interceptors.response.use(response => { return response }, error => {
    logger.request(`Request to ${error.config.url} failed.`);
    return Promise.reject(error);
});

export default api;