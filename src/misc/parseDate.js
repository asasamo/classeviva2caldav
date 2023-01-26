export default {
    dateToString: (date) => {
        // String format: YYYYMMDD
        return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "").substring(0, 8);
    },
    stringToDate: (string) => {
        // String format: YYYYMMDD
        return new Date(string.substring(0, 4), string.substring(4, 6) - 1, string.substring(6, 8));
    }
}