import { HttpClient } from './HttpClient';
import { TChangePasswordDTO, TSignIn, TSignUp, TUser, TUserDTO } from './types';

class UserApi extends HttpClient {
  public constructor() {
    super('https://ya-praktikum.tech/api/v2');
  }

  public logOut = () => this.instance.post('/auth/logout', {});

  public signIn = (data: TSignIn) => this.instance.post('/auth/signin', data);

  public signUp = (data: TSignUp) => this.instance.post('/auth/signup', data);

  public getUser = () => this.instance.get<TUser>('/auth/user');

  public editUser = (data: TUserDTO) =>
    this.instance.put<TUser>('/user/profile', data);

  public editPassword = (data: TChangePasswordDTO) =>
    this.instance.put('/user/password', data);

  public getAvatar = (url: string) =>
    this.instance.get<Blob>(`/resources/${url}`, { responseType: 'blob' });

  public editAvatar = (avatar: Blob) => {
    const data = new FormData();
    data.append('avatar', avatar);
    return this.instance.put('/user/profile/avatar', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  };
}

export const userApi = new UserApi();
