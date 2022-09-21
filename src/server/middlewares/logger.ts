import { RequestHandler } from 'express';
import { createDebug } from '@/server/utils';

const debug = createDebug('request');

const loggerMiddleware: RequestHandler = (req, res, next) => {
  let authDesc = 'Unauthenticated';
  if (req.isAuthenticated()) {
    authDesc = `Authenticated with user:${req.user.id}`;
  }

  const reqDesc = `${req.method} ${req.url}`;
  debug(
    `start %s\n%s\ncookies: %O\nbody: %O`,
    reqDesc,
    authDesc,
    req.cookies,
    req.body
  );
  res.once('finish', () => debug('end %s', reqDesc));
  next();
};

export default loggerMiddleware;
