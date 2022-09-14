import axios, { AxiosError } from 'axios';

import { userApi } from '@/api/userApi';
import { userApi as localUserApi } from '@/api/localUserApi';

import {
  clientToServerNaming,
  serverToClientNaming,
} from '@/utils/convertNaming';
import { notifyError, notifySuccess } from '@/utils/notify';
import { TChangePassword, TSignIn, TSignUp, TUser } from './types';

type TServerError = { reason: string };

class UserService {
  public lastError: Error | null = null;

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

  public getUser = () =>
    userApi
      .getUser()
      .then(({ data }) => serverToClientNaming(data))
      .catch(() => null);

  public getUserFromDB = (id: number) =>
    localUserApi
      .getUser(id)
      .then(({ data }) => serverToClientNaming(data))
      .catch(() => null);

  public signIn = (d: TSignIn) =>
    userApi.signIn(d).then(this.getUser).catch(this._errorHandler);

  public signUp = (d: TSignUp) =>
    userApi
      .signUp(clientToServerNaming(d))
      .then(({ data }) => serverToClientNaming(data))
      .then(this.getUser)
      .catch(this._errorHandler);

  public logOut = () =>
    userApi
      .logOut()
      .then(() => true)
      .catch((error) => {
        this._errorHandler(error);
        return false;
      });

  public editUser = (d: Omit<TUser, 'id' | 'avatar'>) =>
    userApi
      .editUser(clientToServerNaming(d))
      .then(({ data }) => serverToClientNaming(data))
      .then((user) => {
        notifySuccess('Профиль обновлен');
        return user;
      })
      .catch(this._errorHandler);

  public editPassword = (d: TChangePassword) =>
    userApi
      .editPassword(d)
      .then(() => {
        notifySuccess('Пароль успешно обновлен!');
        return true;
      })
      .catch((error) => {
        this._errorHandler(error);
        return false;
      });

  public getAvatar = (d: string) =>
    userApi
      .getAvatar(d)
      .then(({ data }) => data)
      .catch(this._errorHandler);

  public editAvatar = (d: Blob) =>
    userApi
      .editAvatar(d)
      .then(() => {
        notifySuccess('Аватар успешно обновлен!');
        return true;
      })
      .catch((error) => {
        this._errorHandler(error);
        return false;
      });
}

export default new UserService();
