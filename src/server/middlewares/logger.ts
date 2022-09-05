import { RequestHandler } from 'express';
import { createDebug } from '@/server/utils';

const debug = createDebug('request');

const loggerMiddleware: RequestHandler = (req, res, next) => {
  const reqDesc = `${req.method} ${req.url}`;
  debug(`start %s\ncookies: %O`, reqDesc, req.cookies);
  res.once('finish', () => debug('end %s', reqDesc));
  next();
};

export default loggerMiddleware;
