import express, { Express } from 'express';
import router from '@/server/router';
import { logger } from '@/server/middlewares';

const app: Express = express();
app.disable('x-powered-by').enable('trust proxy').use(logger).use(router);

export { app };
