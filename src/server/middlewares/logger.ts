import { RequestHandler } from 'express';

const loggerMiddleware: RequestHandler = (req, _res, next) => {
  req.logger = (message) => {
    const methodUrl = `${req.method} ${req.url}`;

    // eslint-disable-next-line no-console
    console.log(`${methodUrl}${message ? ` - ${message}` : ''}`);
  };
  req.logger();
  next();
};

export default loggerMiddleware;
