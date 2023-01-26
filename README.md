# classeviva2webdav
Add new Classeviva events to a WebDAV calendar

## Run locally
Install dependencies
```bash
npm install
```

Run the app
> You need to set the env variables manually

```bash
npm start
```

## Docker
Create a new `.env` file from the `.env.example` file and fill it with your data.
    
Then run:
```bash
docker-compose up -d --build
```

## For Google Calendar
> Not tested yet

Replace `DAV_*` env variables with the following:
```bash
GOOGLE_USER=your_google_email
GOOGLE_REFRESH_TOKEN=your_refresh_token_with_caldav_permissions
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_CAL=your_calendar_id
```