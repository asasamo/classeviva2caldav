import crypto from "crypto";

export default {
    genEvent: (e) => {
        let evnStart = e.evtStart;
        let evnEnd = new Date(e.evtStart.setDate(e.evtStart.getDate() + 1));
        let uid = crypto.randomBytes(16).toString("hex");
        return {
            string: "BEGIN:VCALENDAR" + "\n" +
                "CALSCALE:GREGORIAN" + "\n" +
                "VERSION:2.0" + "\n" +
                "PRODID:-//classeviva2caldav//NONSGML v1.0//EN" + "\n" +
                "BEGIN:VEVENT" + "\n" +
                `UID:${uid}` + "\n" +
                `DTSTAMP:${(new Date()).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "") /* Created */}` + "\n" +
                `DTSTART;VALUE=DATE:${evnStart.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "").substring(0, 8)}` + "\n" +
                `DTEND;VALUE=DATE:${evnEnd.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "").substring(0, 8)}` + "\n" +
                "STATUS:CONFIRMED" + "\n" +
                `SUMMARY:${e.title}` + "\n" +
                `DESCRIPTION:${e.description}` + "\n" +
                "END:VEVENT" + "\n" +
                "END:VCALENDAR" + "\n",
            uid: uid
        };
    }
}