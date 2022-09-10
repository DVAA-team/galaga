import { RequestHandler } from 'express';
import { ApiError } from '@/server/error';
import {
  clientToServerNaming,
  serverToClientNaming,
} from '@/utils/convertNaming';
import { dbUserController } from '@/database/controllers';
import { createDebug } from '@/server/utils';

const debug = createDebug('MW:checkYandexUser');

const checkYandexUser: RequestHandler = async (_req, res, next) => {
  const { user: yandexUser } = res.locals;

  if (!yandexUser) {
    debug('Yandex user not find');
    return next(ApiError.forbidden('Пользователь не найден'));
  }

  const yandexUserConverted = clientToServerNaming(yandexUser);

  const { id: yandexId, ...rest } = yandexUserConverted;

  let userFromDb = await dbUserController.getByYandexId(yandexId);

  if (!userFromDb) {
    debug('Create own user from Yandex user');
    userFromDb = await dbUserController.createUserFromYandexData({
      ...rest,
      yandexId,
    });
  }

  res.locals.user = { ...serverToClientNaming(userFromDb.toJSON()), yandexId };
  debug(
    'Onw userId:%d; Yandex userId:%d',
    res.locals.user.id,
    res.locals.user.yandexId
  );
  return next();
};

export default checkYandexUser;
