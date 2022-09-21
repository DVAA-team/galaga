import cookieParser from 'cookie-parser';
import express, { Express } from 'express';

import {
  errorHandlerMiddleware,
  getYandexUserMiddleware,
  loggerMiddleware,
  renderMiddleware,
  staticMiddleware,
} from '@/server/middlewares';
import {
  apiRoute,
  getCSRFToken,
  healthChecksRoute,
  yandexApiRoute,
} from '@/server/routes';
import csurfInit from './utils/csurfInit';

const app: Express = express()
  .disable('x-powered-by')
  .enable('trust proxy')
  .use(staticMiddleware)
  .use(cookieParser())
  .use(csurfInit())
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .get('/getCSRFToken', getCSRFToken)
  .use('/yandex-api', yandexApiRoute)
  .use(loggerMiddleware)
  .use('/hc', healthChecksRoute)
  .use(getYandexUserMiddleware)
  .use('/api', apiRoute)
  .get('*', renderMiddleware)
  .use(errorHandlerMiddleware);

export { app };
