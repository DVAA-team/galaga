import { appConstants } from '@/config';
import { AbstractHttpClient } from './AbstractHttpClient';
import {
  TChangePasswordRequest,
  TSingInRequest,
  TSingUpRequest,
  TUserResponse,
  TUserUpdateRequest,
} from './types';

class UserApi extends AbstractHttpClient {
  public constructor() {
    super(appConstants.localApiBaseURL);
  }

  public logOut = () => this.instance.post('/auth/logout', {});

  public signIn = (data: TSingInRequest) =>
    this.instance.post('/auth/signin', data);

  public signUp = (data: TSingUpRequest) =>
    this.instance.post<TUserResponse>('/auth/signup', data);

  public getUser = () => this.instance.get<TUserResponse>('/auth/user');

  public editUser = (data: TUserUpdateRequest) =>
    this.instance.put<TUserResponse>('/users/profile', data);

  public editPassword = (data: TChangePasswordRequest) =>
    this.instance.put('/users/password', data);

  public getAvatar = (url: string) =>
    this.instance.get<Blob>(`${url}`, {
      baseURL: '',
      headers: { accept: 'image/*' },
      responseType: 'blob',
    });

  public editAvatar = (avatar: Blob) => {
    const data = new FormData();
    data.append('avatar', avatar, 'Avatar');

    return this.instance.put<TUserResponse>('/users/avatar', data, {
      headers: {
        /* eslint-disable @typescript-eslint/naming-convention */
        'Content-Type': 'multipart/form-data',
        /* eslint-enable @typescript-eslint/naming-convention */
      },
    });
  };
}

export const userApi = new UserApi();
