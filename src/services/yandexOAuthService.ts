import axios, { AxiosError } from 'axios';
import {
  clientToServerNaming,
  serverToClientNaming,
} from '@/utils/convertNaming';
import { notifyError } from '@/utils/notify';
import { yandexOAuthApi } from '@/api/yandexOAuthApi';
import { TYandexOAuthSingIn } from './types';

type TServerError = { reason: string };

class YandexOAuthService {
  public lastError: Error | null = null;

  public getServiceId = () =>
    yandexOAuthApi
      .getServiceId()
      .then(({ data }) => {
        return data.service_id ?? '';
      })
      .catch(this._errorHandler);

  public signIn = (d: TYandexOAuthSingIn) =>
    yandexOAuthApi
      .signIn(clientToServerNaming(d))
      .then(({ data }) => serverToClientNaming(data))
      .catch(this._errorHandler);

  public getAuthorizeUrl = () => {
    return this.getServiceId().then((id) => {
      if (id) {
        return `https://oauth.yandex.ru/authorize?response_type=code&client_id=${id}&redirect_uri=${this._redirectUri}`;
      }
      return '';
    });
  };

  private _redirectUri = 'http://localhost:3000';

  private _errorHandler = (e: AxiosError) => {
    if (axios.isAxiosError(e)) {
      const error = e as AxiosError<TServerError>;
      const reason = error.response?.data?.reason;

      if (reason) {
        notifyError(reason);
      }
    }
    this.lastError = e;
    return null;
  };
}

export default new YandexOAuthService();
