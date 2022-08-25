import express, { Express } from 'express';

import { healthChecks, users, yandexApi } from '@/server/routes';
import {
  logger,
  render,
  errorHandler,
  getYandexUser,
} from '@/server/middlewares';

import path from 'node:path';
import cookieParser from 'cookie-parser';

const app: Express = express()
  .disable('x-powered-by')
  .enable('trust proxy')
  .use(yandexApi)
  .use(express.static(path.join(__dirname, '..', 'public')))
  .use(cookieParser())
  .use(logger)
  .use('/hc', healthChecks)
  .use('/auth', users)
  .get('*', [getYandexUser, render])
  .use(errorHandler);

export { app };
