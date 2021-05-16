import mongoose from 'mongoose';
import { databaseUrl } from '.';
import Logger from '../core/Logger';

export const connectDatabase = (): void => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  mongoose.connect(databaseUrl!, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  mongoose.connection.on('connected', function () {
    Logger.info('mongoose connected to ' + databaseUrl);
  });

  mongoose.connection.on('disconnected', function () {
    Logger.error('mongoose disconnected');
  });

  mongoose.connection.on('error', function (err) {
    Logger.error('mongoose connection error ' + err);
  });

  process.on('SIGINT', function () {
    mongoose.connection.close(function () {
      Logger.error('mongoose disconnected through app termination!');
      process.exit(0);
    });
  });

  process.on('SIGTERM', function () {
    mongoose.connection.close(function () {
      Logger.error('mongoose disconnected through app termination!');
      process.exit(0);
    });
  });

  process.once('SIGUSR2', function () {
    mongoose.connection.close(function () {
      Logger.error('mongoose disconnected through app termination!');
      process.kill(process.pid, 'SIGUSR2');
    });
  });
};
