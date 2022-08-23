import axios, { AxiosError } from 'axios';
import { serverToClientNaming } from '@/utils/convertNaming';
import { notifyError } from '@/utils/notify';
import { yandexOAuthApi } from '@/api/yandexOAuthApi';

type TServerError = { reason: string };

class YandexOAuthService {
  public lastError: Error | null = null;

  constructor() {
    try {
      this._redirectUri = window.location.origin;
    } catch (e) {
      this._redirectUri = '';
    }
  }

  public getServiceId = () =>
    yandexOAuthApi
      .getServiceId()
      .then(({ data }) => {
        return data.service_id ?? '';
      })
      .catch(this._errorHandler);

  public signIn = (authorizationCode: string) =>
    yandexOAuthApi
      .signIn({
        code: authorizationCode,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        redirect_uri: this._redirectUri,
      })
      .then(({ data }) => serverToClientNaming(data))
      .catch(this._errorHandler);

  public getAuthorizeUrl = async () => {
    if (this._redirectUri) {
      const serviceId = await this.getServiceId();
      if (serviceId) {
        return `https://oauth.yandex.ru/authorize?response_type=code&client_id=${serviceId}&redirect_uri=${this._redirectUri}`;
      }
    }
    return '';
  };

  private readonly _redirectUri: string = '';

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
