import { app } from '@/server/app';
import normalizePort from '@/server/utils/normalizePort';
import { startServer } from '@/server/utils/startApp';
import dotenv from 'dotenv';
import { dbConnect, migrationsManager } from '@/../../backend/database/init';

dotenv.config();

const PORT = normalizePort(process.env.PORT || '3000');

// eslint-disable-next-line no-console
console.log('Connecting to database...');

dbConnect()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Connection to database has been established successfully.');

    // eslint-disable-next-line no-console
    console.log('Applying migrations...');

    migrationsManager.up().then(() => {
      // eslint-disable-next-line no-console
      console.log('All migrations has been successfully applied');
      startServer(app, PORT);
    });
  })
  .catch((error) => {
    console.error(error);
  });
