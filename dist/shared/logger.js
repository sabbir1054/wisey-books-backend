'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.logger = exports.errorLogger = void 0;
const winston_1 = require('winston');
const { combine, timestamp, label, printf } = winston_1.format;
// custom log formate
const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp);
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${date.toDateString()} ${hour}:${minutes}:${seconds} } [${label}] ${level}: ${message}`;
});
const logger = (0, winston_1.createLogger)({
  level: 'info',
  format: combine(label({ label: 'DCH' }), timestamp(), myFormat),
  // save log file based on condition
  transports:
    // config.env === 'production'
    //   ? [
    //       new DailyRotateFile({
    //         filename: path.join(
    //           process.cwd(),
    //           'logs',
    //           'winston',
    //           'successes',
    //           'ump-%DATE%.success.log'
    //         ),
    //         datePattern: 'YYYY-MM-DD-HH',
    //         zippedArchive: true,
    //         maxSize: '20m',
    //         maxFiles: '14d',
    //       }),
    //     ]
    //   :
    [new winston_1.transports.Console()],
});
exports.logger = logger;
const errorLogger = (0, winston_1.createLogger)({
  level: 'error',
  format: combine(label({ label: 'DCH' }), timestamp(), myFormat),
  transports:
    // config.env === 'production'
    //   ? [
    //       new DailyRotateFile({
    //         filename: path.join(
    //           process.cwd(),
    //           'logs',
    //           'winston',
    //           'errors',
    //           'ump-%DATE%.error.log'
    //         ),
    //         datePattern: 'YYYY-MM-DD-HH',
    //         zippedArchive: true,
    //         maxSize: '20m',
    //         maxFiles: '14d',
    //       }),
    //     ]
    //   :
    [new winston_1.transports.Console()],
});
exports.errorLogger = errorLogger;
