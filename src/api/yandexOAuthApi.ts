import { TYandexOAuthSingInRequest } from '@/api/types';
import appConstants from '@/config/appConstants';
import { AbstractHttpClient } from './AbstractHttpClient';

class YandexOAuthApi extends AbstractHttpClient {
  public constructor() {
    super(appConstants.apiBaseURL);
  }

  public getServiceId = () => this.instance.get('/oauth/yandex/service-id');

  public signIn = (data: TYandexOAuthSingInRequest) =>
    this.instance.post('/oauth/yandex', data);
}

export const yandexOAuthApi = new YandexOAuthApi();
