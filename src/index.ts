import { app } from './app';
import { config } from './config/config';
import { logger } from './config/logger';

const server = app.listen(config.port, () => {
  logger.info(`Listening on port ${config.port}`);
});

const exitHandler = (): void => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: Error): void => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
process.on('SIGTERM', () => {
  logger.info('SIGTERM initiated');
  if (server) {
    server.close();
  }
});
