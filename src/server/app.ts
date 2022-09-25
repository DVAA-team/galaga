import cookieParser from 'cookie-parser';
import express from 'express';

import {
  csurfMiddleware,
  errorHandlerMiddleware,
  helmetMiddleware,
  loggerMiddleware,
  renderMiddleware,
  staticMiddleware,
  createSessionMiddlewares,
} from '@/server/middlewares';
import { apiRoute, healthChecksRoute } from '@/server/routes';
import { initializeDB } from '@/database';

export const createApp = async () => {
  const dbInitializeResult = await initializeDB();
  if (dbInitializeResult instanceof Error) {
    return null;
  }
  const { sequelizeSessionStore } = dbInitializeResult;

  return express()
    .disable('x-powered-by')
    .enable('trust proxy')
    .use(staticMiddleware)
    .use(helmetMiddleware)
    .use(createSessionMiddlewares({ store: sequelizeSessionStore }))
    .use(cookieParser())
    .use(csurfMiddleware)
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use(loggerMiddleware)
    .use('/hc', healthChecksRoute)
    .use('/api', apiRoute)
    .get('*', renderMiddleware)
    .use(errorHandlerMiddleware);
};
