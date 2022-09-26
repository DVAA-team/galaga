import axios from 'axios';
import OAuth2Strategy, { VerifyCallback } from 'passport-oauth2';

import {
  TYandexTokenResponse,
  TYandexUserInfo,
} from '@/server/controllers/auth/yandex/yandexApiTypes';

export type TVerifyFunction = (
  accessToken: string,
  refreshToken: string,
  results: TYandexTokenResponse,
  profile: TYandexUserInfo,
  verified: VerifyCallback
) => void;

type TYandexOAuth2StrategyOptions = {
  clientID: string;
  clientSecret: string;
  redirectURI: string;
  verifyFunction: TVerifyFunction;
};

export class YandexOAuth2Strategy extends OAuth2Strategy {
  constructor({
    clientID,
    clientSecret,
    redirectURI,
    verifyFunction,
  }: TYandexOAuth2StrategyOptions) {
    super(
      {
        authorizationURL: 'https://oauth.yandex.ru/authorize',
        clientID,
        clientSecret,
        tokenURL: 'https://oauth.yandex.ru/token',
        callbackURL: redirectURI,
      },
      verifyFunction
    );
    this.name = 'yandex';
  }

  override userProfile(
    accessToken: string,
    done: (err?: Error | null, profile?: TYandexUserInfo) => void
  ): void {
    axios
      .get<TYandexUserInfo>('https://login.yandex.ru/info', {
        params: {
          format: 'json',
        },
        headers: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          Authorization: `OAuth ${accessToken}`,
        },
      })
      .then(({ data }) => done(null, data))
      .catch((error) => done(error));
  }
}
