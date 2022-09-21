import cookieParser from 'cookie-parser';
import express from 'express';

import {
  errorHandlerMiddleware,
  loggerMiddleware,
  renderMiddleware,
  staticMiddleware,
} from '@/server/middlewares';
import { apiRoute, healthChecksRoute } from '@/server/routes';
import { initializeDB } from '@/database';
import { createSessionMiddlewares } from '@/server/config/session';

const dbInitializeResultPromise = initializeDB();

export const createApp = async () => {
  const dbInitializeResult = await dbInitializeResultPromise;
  if (dbInitializeResult instanceof Error) {
    return null;
  }
  const { sequelizeSessionStore } = dbInitializeResult;

  return (
    express()
      .disable('x-powered-by')
      .enable('trust proxy')
      .use(staticMiddleware)
      .use(createSessionMiddlewares({ store: sequelizeSessionStore }))
      .use(cookieParser())
      .use(express.json())
      .use(express.urlencoded({ extended: false }))
      // .use('/yandex-api', yandexApiRoute)
      .use(loggerMiddleware)
      .use('/hc', healthChecksRoute)
      // .use(getYandexUserMiddleware)
      .use('/api', apiRoute)
      .get('*', renderMiddleware)
      .use(errorHandlerMiddleware)
  );
};
