import { ErrorRequestHandler } from 'express';
import createDebug from '@/utils/debug';

const debug = createDebug.extend('MW:errorHandler');

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  debug(error);
  res.status(500).end();
};

export default errorHandler;
