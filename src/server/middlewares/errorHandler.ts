import { ErrorRequestHandler } from 'express';
import createDebug from '@/utils/debug';
import { ApiError } from '@/server/error';

const debug = createDebug('MW:errorHandler');

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  debug(error);
  if (error instanceof ApiError) {
    return res.status(error.status).json({ message: error.message });
  }
  return res.status(500).json({ message: 'Непредвиденная ошибка' });
};

export default errorHandler;
