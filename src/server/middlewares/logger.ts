import { RequestHandler } from 'express';

const loggerMiddleware: RequestHandler = (req, _res, next) => {
  req.logger = (message) => {
    const methodUrl = `${req.method} ${req.url}`;
    const isoDateTime = new Date().toISOString();

    // eslint-disable-next-line no-console
    console.log(
      `[${isoDateTime}] ${methodUrl}${message ? ` - ${message}` : ''}`
    );
  };
  req.logger();
  next();
};

export default loggerMiddleware;
