const client = process.env.DAV_USER === undefined ? // Using Google Calendar
    require("./googleClient.js").default :
    require('./nextcloudClient.js').default; // Using Nextcloud Calendar

export default client;