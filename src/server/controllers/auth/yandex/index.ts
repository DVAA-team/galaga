import passport from 'passport';

import {
  dbUserController,
  dbUserOAuth2DataController,
} from '@/database/controllers';
import { appConstants } from '@/config';
import { oauth2 } from '@/server/config';
import {
  YandexOAuth2Strategy,
  TVerifyFunction,
} from '@/server/controllers/auth/yandex/YandexOAuth2Strategy';
import { Request, RequestHandler, Response } from 'express';

const findOrCreateUser: TVerifyFunction = (
  accessToken,
  refreshToken,
  // eslint-disable-next-line camelcase
  { expires_in },
  profile,
  verified
) => {
  dbUserOAuth2DataController
    .findOrCreate({
      accessToken,
      refreshToken,
      provider: 'yandex',
      providerUserId: profile.id,
      expiresIn: new Date(expires_in),
    })
    .then(async (oauth2Data) => {
      if (!oauth2Data.userId) {
        const user = await dbUserController.create({
          /* eslint-disable @typescript-eslint/naming-convention */
          email: profile.default_email,
          first_name: profile.first_name,
          second_name: profile.last_name,
          display_name: profile.display_name,
          login: profile.login,
          phone: '',
          // FIXME Добавить пут до аватарки пользователя яндекс
          avatar: '///',
        });
        dbUserOAuth2DataController.setUserIdTo(oauth2Data.id, user.id);
        return user;
      }
      return dbUserController.getUserById(oauth2Data.userId);
    })
    .then((user) => {
      if (user) {
        verified(null, user);
      } else {
        verified(null);
      }
    })
    .catch((error) => verified(error));
};

passport.use(
  new YandexOAuth2Strategy({
    clientID: oauth2.yandexClientID,
    clientSecret: oauth2.yandexClientSecret,
    redirectURI: `${appConstants.baseURL}/api/auth/yandex/callback`,
    verifyFunction: findOrCreateUser,
  })
);

export const authenticate: RequestHandler = passport.authenticate('yandex', {
  failureRedirect: '/sign-in',
});

export const authenticateAndRedirectTo = (url: string): RequestHandler[] => [
  passport.authenticate('yandex', { failureRedirect: '/sign-in' }),
  (_req: Request, res: Response) => res.redirect(url),
];