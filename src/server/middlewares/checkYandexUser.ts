import { RequestHandler } from 'express';
import { ApiError } from '@/server/error';
import {
  clientToServerNaming,
  serverToClientNaming,
} from '@/utils/convertNaming';
import { dbUserController } from '@/database/controllers';

const checkYandexUser: RequestHandler = async (_req, res, next) => {
  const { user: yandexUser } = res.locals;

  if (!yandexUser) {
    return next(ApiError.forbidden('Пользователь не найден'));
  }

  const yandexUserConverted = clientToServerNaming(yandexUser);

  const { id: yandexId, ...rest } = yandexUserConverted;

  let userFromDb = await dbUserController.getByYandexId(yandexId);

  if (!userFromDb) {
    userFromDb = await dbUserController.createUserFromYandexData({
      ...rest,
      yandexId,
    });
  }
  res.locals.user = serverToClientNaming(userFromDb.toJSON());
  return next();
};

export default checkYandexUser;
