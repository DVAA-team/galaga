import { RequestHandler } from 'express';
import axios from 'axios';
import { serverToClientNaming } from '@/utils/convertNaming';
import { createDebug } from '@/server/utils';

const debug = createDebug('MW:getYandexUser');

const getYandexUser: RequestHandler = async (req, res, next) => {
  const cookie = Object.entries(req.cookies)
    .map(([key, value]) => `${key}=${value}`)
    .join('; ');
  try {
    debug('request user');
    const { data } = await axios.get(
      'https://ya-praktikum.tech/api/v2/auth/user',
      {
        withCredentials: true,
        headers: {
          cookie,
        },
      }
    );

    res.locals.user = serverToClientNaming(data);
  } catch (error) {
    res.locals.user = null;
  } finally {
    if (!res.locals.user) {
      debug(`not authorize`);
    } else {
      debug(
        'receive user id:%d login:%s',
        res.locals.user.id,
        res.locals.user.login
      );
    }
    next();
  }
};

export default getYandexUser;
