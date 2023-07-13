import { createLogger, format, transports } from 'winston';
const { combine, timestamp, label, printf } = format;
// custom log formate

const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp);
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${date.toDateString()} ${hour}:${minutes}:${seconds} } [${label}] ${level}: ${message}`;
});

const logger = createLogger({
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
    [new transports.Console()],
});

const errorLogger = createLogger({
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
    [new transports.Console()],
});

export { errorLogger, logger };
