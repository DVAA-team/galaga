import express, { Express } from 'express';
import { healthChecks } from '@/server/routes';
import {
  logger,
  render,
  errorHandler,
  initStoreWithUser,
} from '@/server/middlewares';
import path from 'node:path';
import cookieParser from 'cookie-parser';

const app: Express = express()
  .disable('x-powered-by')
  .enable('trust proxy')
  .use(logger)
  .use(express.static(path.join(__dirname, '..', 'public')))
  .use('/hc', healthChecks)
  .use(cookieParser())
  .get('*', [initStoreWithUser, render])
  .use(errorHandler);

export { app };
