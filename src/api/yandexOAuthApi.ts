import { TYandexOAuthSingInRequest } from '@/api/types';
import { AbstractHttpClient } from './AbstractHttpClient';

class YandexOAuthApi extends AbstractHttpClient {
  public constructor() {
    super('https://ya-praktikum.tech/api/v2');
  }

  public getServiceId = () => this.instance.get('/oauth/yandex/service-id');

  public signIn = (data: TYandexOAuthSingInRequest) =>
    this.instance.post('/oauth/yandex', data);
}

export const yandexOAuthApi = new YandexOAuthApi();
