import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { errorLogger, logger } from './shared/logger';
let server: Server;
// uncaught exception error handle
process.on('uncaughtException', error => {
  errorLogger.error(error);
  process.exit(1);
});

async function mainBootstrap() {
  try {
    await mongoose.connect(config.databaseUrl as string);

    logger.info(`🛢   Database is connected successfully`);

    server = app.listen(config.port, () => {
      logger.info(`Application  listening on port ${config.port}`);
    });
  } catch (err) {
    errorLogger.error('Failed to connect database', err);
  }

  // unhandled rejection error handle

  process.on('unhandledRejection', err => {
    errorLogger.error(
      'Unhandled Rejection Detected, we are closing our server'
    );

    if (server) {
      server.close(() => {
        errorLogger.error(err);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

mainBootstrap();

// SIGTERM handle
process.on('SIGTERM', () => {
  logger.info('SIGTERM is Received');

  if (server) {
    server.close();
  }
});
