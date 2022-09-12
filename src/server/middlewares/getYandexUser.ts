import { RequestHandler } from 'express';
import axios from 'axios';
import { serverToClientNaming } from '@/utils/convertNaming';
import { createDebug } from '@/server/utils';
import { dbUserController } from '@/database/controllers';

const debug = createDebug('MW:getYandexUser');

const getYandexUser: RequestHandler = async (req, res, next) => {
  const cookie = Object.entries(req.cookies)
    .map(([key, value]) => `${key}=${value}`)
    .join('; ');
  try {
    debug('request user');
    const { data: yandexUser } = await axios.get(
      'https://ya-praktikum.tech/api/v2/auth/user',
      {
        withCredentials: true,
        headers: {
          cookie,
        },
      }
    );
    const { id: yandexId, ...rest } = yandexUser;
    let userFromDb = await dbUserController.getByYandexId(yandexId);
    if (!userFromDb) {
      debug('Create own user from Yandex user');
      userFromDb = await dbUserController.createUserFromYandexData({
        ...rest,
        yandexId,
      });
    } else {
      debug('Update own user from Yandex user');
      userFromDb = await userFromDb.update({ ...rest, yandexId });
    }
    res.locals.user = serverToClientNaming(userFromDb.toJSON());
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
