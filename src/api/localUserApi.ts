import { AbstractHttpClient } from './AbstractHttpClient';
import { TUserResponse } from './types';

class UserApi extends AbstractHttpClient {
  public constructor() {
    super('/');
  }

  public getUser = (id: number) =>
    this.instance.get<TUserResponse>(`/auth/user/${id}`);
}

export const userApi = new UserApi();
