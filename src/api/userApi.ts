import { appConstants } from '@/config';
import { AbstractHttpClient } from './AbstractHttpClient';
import {
  TChangePasswordRequest,
  TSignUpResponse,
  TSingInRequest,
  TSingUpRequest,
  TUserResponse,
  TUserUpdateRequest,
} from './types';

class UserApi extends AbstractHttpClient {
  public constructor() {
    super(appConstants.yandexApiBaseURL);
  }

  public logOut = () =>
    this.getCSRFToken().then(() => this.instance.post('/auth/logout', {}));

  public signIn = (data: TSingInRequest) =>
    this.getCSRFToken().then(() => this.instance.post('/auth/signin', data));

  public signUp = (data: TSingUpRequest) =>
    this.getCSRFToken().then(() =>
      this.instance.post<TSignUpResponse>('/auth/signup', data)
    );

  public getUser = () => this.instance.get<TUserResponse>('/auth/user');

  public editUser = (data: TUserUpdateRequest) =>
    this.getCSRFToken().then(() =>
      this.instance.put<TUserResponse>('/user/profile', data)
    );

  public editPassword = (data: TChangePasswordRequest) =>
    this.getCSRFToken().then(() => this.instance.put('/user/password', data));

  public getAvatar = (url: string) =>
    this.instance.get<Blob>(`/resources/${url}`, { responseType: 'blob' });

  public editAvatar = (avatar: Blob) => {
    const data = new FormData();
    data.append('avatar', avatar);

    return this.getCSRFToken().then(() =>
      this.instance.put<TUserResponse>('/user/profile/avatar', data, {
        headers: {
          /* eslint-disable @typescript-eslint/naming-convention */
          'Content-Type': 'multipart/form-data',
          /* eslint-enable @typescript-eslint/naming-convention */
        },
      })
    );
  };
}

export const userApi = new UserApi();
