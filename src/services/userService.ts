import axios, { AxiosError } from 'axios';

import { userApi } from '@/api/userApi';
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

  // eslint-disable-next-line class-methods-use-this
  public getUser = () =>
    userApi
      .getUser()
      .then(({ data }) => {
        const user = serverToClientNaming(data);
        document.cookie = `user=${encodeURIComponent(
          JSON.stringify(user)
        )}; path=/`;
        return user;
      })
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
      .then(() => {
        document.cookie = `user= ; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        return true;
      })
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
        document.cookie = `user=${encodeURIComponent(
          JSON.stringify(user)
        )}; path=/`;
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
