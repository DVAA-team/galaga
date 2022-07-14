import { HttpClient } from './HttpClient';
import { TSignIn, TSignUp, TUser, TUserDTO, TPassword } from './types';

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

  public editPassword = (data: TPassword) =>
    this.instance.put('/user/password', data);
}

export const userApi = new UserApi();
