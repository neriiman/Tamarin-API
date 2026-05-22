import fs from 'fs';
import { createLogger, format, transports } from 'winston';

const { combine, timestamp, errors, colorize, printf, json } = format;

if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs');
}

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

const logger = createLogger({
  level: 'info',

  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), errors({ stack: true }), json()),

  transports: [
    new transports.Console({
      format: combine(
        colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        errors({ stack: true }),
        logFormat,
      ),
    }),

    // new transports.File({
    //   filename: 'logs/combined.log',
    // }),

    // new transports.File({
    //   filename: 'logs/error.log',
    //   level: 'error',
    // }),
  ],

  exceptionHandlers: [
    new transports.Console({
      format: combine(
        colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        errors({ stack: true }),
        logFormat,
      ),
    }),
    // new transports.File({
    //   filename: 'logs/exceptions.log',
    // }),
  ],

  rejectionHandlers: [
    new transports.Console({
      format: combine(
        colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        errors({ stack: true }),
        logFormat,
      ),
    }),
    // new transports.File({
    //   filename: 'logs/rejections.log',
    // }),
  ],
});

export default logger;
