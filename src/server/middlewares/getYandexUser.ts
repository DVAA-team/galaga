import { RequestHandler } from 'express';
import axios from 'axios';
import { serverToClientNaming } from '@/utils/convertNaming';

const getYandexUser: RequestHandler = async (req, res, next) => {
  const cookie = Object.entries(req.cookies)
    .map(([key, value]) => `${key}=${value}`)
    .join('; ');
  try {
    req.logger('request Yandex user');
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
      req.logger(`Yandex not authorize`);
    } else {
      req.logger(
        `receive Yandex user id:${res.locals.user.id} name:${res.locals.user.firstName}`
      );
    }
    next();
  }
};

export default getYandexUser;
