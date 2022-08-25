import express, { Express } from 'express';
import { healthChecks, users } from '@/server/routes';
import { logger, render, errorHandler } from '@/server/middlewares';
import path from 'node:path';

const app: Express = express()
  .disable('x-powered-by')
  .enable('trust proxy')
  .use(logger)
  .use(express.static(path.join(__dirname, '..', 'public')))
  .use('/hc', healthChecks)
  .use('/auth', users)
  .get('*', render)
  .use(errorHandler);

export { app };
