import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (error, req, res, _next) => {
  req.logger(`error ${error.message}`);
  res.status(500).end();
};

export default errorHandler;
