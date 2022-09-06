import cookieParser from 'cookie-parser';
import express, { Express } from 'express';

import {
  checkYandexUserMiddleware,
  errorHandlerMiddleware,
  getYandexUserMiddleware,
  loggerMiddleware,
  renderMiddleware,
  staticMiddleware,
} from '@/server/middlewares';
import { apiRoute, healthChecksRoute, yandexApiRoute } from '@/server/routes';

const app: Express = express()
  .disable('x-powered-by')
  .enable('trust proxy')
  .use(staticMiddleware)
  .use(cookieParser())
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use('/yandex-api', yandexApiRoute)
  .use(loggerMiddleware)
  .use('/api', [getYandexUserMiddleware, checkYandexUserMiddleware, apiRoute])
  .use('/hc', healthChecksRoute)
  .get('*', [getYandexUserMiddleware, renderMiddleware])
  .use(errorHandlerMiddleware);

export { app };
