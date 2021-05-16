import { createLogger, transports, format } from 'winston';
import fs from 'fs';
import path from 'path';
import DailyRotateFile from 'winston-daily-rotate-file';
import { environment, logDir } from '../config';

const { combine, errors, timestamp, prettyPrint } = format;

let dir = logDir;
if (!dir) dir = path.resolve('logs');

// create directory if it is not present
if (!fs.existsSync(dir)) {
  // Create the directory if it does not exist
  fs.mkdirSync(dir);
}

const logLevel = environment === 'development' ? 'debug' : 'warn';

const options = {
  file: {
    level: logLevel,
    filename: dir + '/%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    timestamp: true,
    handleExceptions: true,
    humanReadableUnhandledException: true,
    prettyPrint: true,
    json: true,
    maxSize: '20m',
    colorize: true,
    maxFiles: '21d',
  },
};

//creates a logger instace and exports it. It logs to a daily rotate file on uncaught exceptions
export default createLogger({
  transports: [
    new transports.Console({
      level: logLevel,
      format: combine(errors({ stack: true }), timestamp(), prettyPrint()),
    }),
  ],
  exceptionHandlers: [new DailyRotateFile(options.file)],
  exitOnError: false, // do not exit on unhandled exceptions
});
