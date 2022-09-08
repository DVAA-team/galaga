import { RequestHandler } from 'express';
import { ApiError } from '@/server/error';
import { createDebug } from '@/server/utils';

const debug = createDebug('MW:checkUser');

const checkUser: RequestHandler = async (_req, res, next) => {
  const { user } = res.locals;

  if (!user) {
    debug('User not find');
    return next(ApiError.forbidden('Пользователь не найден'));
  }
  return next();
};

export default checkUser;
