import { appConstants } from '@/config';
import { AbstractHttpClient } from './AbstractHttpClient';
import { TUserResponse } from './types';

class UserApi extends AbstractHttpClient {
  public constructor() {
    super(appConstants.localApiBaseURL);
  }

  public getUser = (id: number) =>
    this.instance.get<TUserResponse>(`/users/${id}`);
}

export const userApi = new UserApi();
