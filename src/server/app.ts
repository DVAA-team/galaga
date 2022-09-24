import cookieParser from 'cookie-parser';
import express, { Express } from 'express';

import {
  csurfMiddleware,
  errorHandlerMiddleware,
  getYandexUserMiddleware,
  helmetMiddleware,
  loggerMiddleware,
  renderMiddleware,
  staticMiddleware,
} from '@/server/middlewares';
import { apiRoute, healthChecksRoute, yandexApiRoute } from '@/server/routes';

const app: Express = express()
  .disable('x-powered-by')
  .enable('trust proxy')
  .use(staticMiddleware)
  .use(helmetMiddleware)
  .use(cookieParser())
  .use(csurfMiddleware)
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use('/yandex-api', yandexApiRoute)
  .use(loggerMiddleware)
  .use('/hc', healthChecksRoute)
  .use(getYandexUserMiddleware)
  .use('/api', apiRoute)
  .get('*', renderMiddleware)
  .use(errorHandlerMiddleware);

export { app };
