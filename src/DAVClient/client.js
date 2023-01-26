const client = process.env.DAV_USER === undefined ? // Using Google Calendar
    await import("./googleClient.js") :
    await import('./nextcloudClient.js'); // Using Nextcloud Calendar

export default client.default;