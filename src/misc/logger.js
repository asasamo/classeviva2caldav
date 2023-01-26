import chalk from "chalk";

const logger = {
    log: (message) => {
        console.log(chalk.bgWhite("[LOG]") + " - " + message);
    },
    info: (message) => {
        console.log(chalk.bgBlue("[INFO]") + " - " + message);
    },
    error: (message) => {
        console.log(chalk.bgRed("[ERROR]") + " - " + message);
    },
    request: (message) => {
        console.log(chalk.bgGreen("[REQUEST]") + " - " + message);
    },
    debug: (message) => {
        if (process.env.NODE_ENV !== "production")
            console.log(chalk.bgYellow("[DEBUG]") + " - " + message);
    }
}

export default logger;