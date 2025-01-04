const winston = require("winston");

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.errors({ stack: true }),
        winston.format.printf(({ level, message, timestamp, stack }) => 
            `${timestamp} : ${level.toUpperCase()}: ${stack || message}`
        )
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.printf(({ level, message, timestamp }) =>
                    `${timestamp} : ${level}: ${message}`
                )
            ),
        }),
        new winston.transports.File({ filename: 'logs/combined.log', level: 'info' }),
        new winston.transports.File({ filename: 'logs/errors.log', level: 'error' }),
    ],
});

module.exports = logger;
