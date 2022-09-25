import passport from 'passport';
import axios from 'axios';
import { promises as fs } from 'node:fs';

import {
  dbUserController,
  dbUserOAuth2DataController,
} from '@/database/controllers';
import { appConstants } from '@/config';
import { oauth2, projectPaths } from '@/server/config';
import {
  YandexOAuth2Strategy,
  TVerifyFunction,
} from '@/server/controllers/auth/yandex/YandexOAuth2Strategy';
import { Request, RequestHandler, Response } from 'express';
import { serverToClientNaming } from '@/utils/convertNaming';
import path from 'node:path';

const findOrCreateUser: TVerifyFunction = (
  accessToken,
  refreshToken,
  // eslint-disable-next-line camelcase
  { expires_in },
  yandexProfile,
  verified
) => {
  dbUserOAuth2DataController
    .findOrCreate({
      accessToken,
      refreshToken,
      provider: 'yandex',
      providerUserId: yandexProfile.id,
      expiresIn: new Date(expires_in),
    })
    .then(async (oauth2Data) => {
      if (!oauth2Data.userId) {
        const userOrError = await dbUserController.create({
          /* eslint-disable @typescript-eslint/naming-convention */
          email: yandexProfile.default_email,
          first_name: yandexProfile.first_name,
          second_name: yandexProfile.last_name,
          display_name: yandexProfile.display_name,
          login: yandexProfile.login,
          phone: '',
          avatar: null,
        });
        if (userOrError instanceof Error) {
          throw userOrError;
        }
        if (!yandexProfile.is_avatar_empty) {
          const { data: avatar } = await axios.get<Buffer>(
            `https://avatars.yandex.net/get-yapic/${yandexProfile.default_avatar_id}/islands-200`,
            {
              responseType: 'arraybuffer',
            }
          );
          await fs.writeFile(
            path.resolve(
              projectPaths.dist,
              'files/avatars',
              `${userOrError.id}.png`
            ),
            avatar
          );
          await dbUserController.update(userOrError.id, {
            avatar: `avatars/${userOrError.id}.png`,
          });
        }
        dbUserOAuth2DataController.setUserIdTo(oauth2Data.id, userOrError.id);
        return userOrError;
      }
      return dbUserController.getUserById(oauth2Data.userId);
    })
    .then((user) => {
      if (user) {
        verified(null, { ...serverToClientNaming(user), isOAuth2User: true });
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
