import { dbUserController } from '@/database/controllers';
import type { RequestHandler, Response, Request } from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy, VerifyFunction } from 'passport-local';
import { TSignUpResponse, TSingUpRequest } from '@/api/types';
import { createDebug } from '@/server/utils';
import { ApiError } from '@/server/error';
import { serverToClientNaming } from '@/utils/convertNaming';

const debug = createDebug('AuthController:local');

const findUser: VerifyFunction = (login, password, verified) => {
  debug('find user %s', login);
  dbUserController
    .verifiedPassword(login, password)
    .then((user) =>
      verified(null, user, { message: 'Incorrect login or password' })
    )
    .catch((error) => verified(error));
};

passport.use(
  new LocalStrategy(
    {
      usernameField: 'login',
    },
    findUser
  )
);

export const signin: RequestHandler[] = [
  passport.authenticate('local'),
  (req: Request, res: Response) => {
    res.json(req.user);
  },
];
export const signup: RequestHandler<
  unknown,
  TSignUpResponse,
  TSingUpRequest
> = async (req, res, next) => {
  // TODO Логика регистрации
  const newUserOrError = await dbUserController.create({
    /* eslint-disable @typescript-eslint/naming-convention */
    display_name: null,
    avatar: null,
    ...req.body,
    /* eslint-enable @typescript-eslint/naming-convention */
  });
  if (newUserOrError instanceof Error) {
    if (
      newUserOrError.message.includes(
        'Пользователь с таким логином уже существует'
      )
    ) {
      next(ApiError.badRequest(newUserOrError.message));
      return;
    }
    next(newUserOrError);
    return;
  }
  req.login(serverToClientNaming(newUserOrError), (err) => {
    if (err) {
      next(err);
      return;
    }
    res.status(201).json(newUserOrError);
  });
};
export const logout: RequestHandler = (req, res, next) => {
  req.logout((error) => {
    if (error) {
      next(error);
      return;
    }
    req.session.destroy((err) => {
      if (err) {
        next(err);
        return;
      }
      res.clearCookie('auth');
      res.end();
    });
  });
};
