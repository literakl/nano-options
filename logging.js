const { createLogger, format, transports } = require('winston');
const { combine, timestamp, prettyPrint } = format;

let logger;

if (process.env.NODE_ENV === 'test') {
    logger = createLogger({
        level: 'debug',
        format: combine(
            timestamp(),
            prettyPrint()
        ),
        transports: [
            new transports.File({ filename: 'test.log' }),
        ]
    });
} else {
    logger = createLogger({
        level: 'debug',
        format: combine(
            timestamp(),
            prettyPrint()
        ),
        // defaultMeta: { service: 'user-service' },
        transports: [
            new transports.File({ filename: 'application.log' }),
            new transports.File({ filename: 'error.log', level: 'warn', handleExceptions: true, exitOnError: false })
        ]
    });

    if (process.env.NODE_ENV !== 'production') {
        logger.add(new transports.Console({
            format: format.simple()
        }));
    }
}

logger.on('finish', function (info) {
    console.log("Is it ever called?")
    // All `info` log messages has now been logged
});

module.exports = logger;
