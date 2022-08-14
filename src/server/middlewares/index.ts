import { RequestHandler } from 'express';
import loggerMiddleware from './logger';
import renderMiddleware from './render';

const logger: RequestHandler = loggerMiddleware();
const render: RequestHandler | RequestHandler[] = renderMiddleware();

export { render, logger };
