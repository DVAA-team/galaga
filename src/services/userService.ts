import axios, { AxiosError } from 'axios';
import { TChangePasswordDTO, TSignIn, TSignUp, TUserDTO } from '../api/types';
import { notifyError, notifySuccess } from '../utils/notify';
import { userApi } from '../api/userApi';

type TServerError = { reason: string };

const errorHandler = (e: AxiosError) => {
  if (axios.isAxiosError(e)) {
    const error = e as AxiosError<TServerError>;
    const reason = error.response?.data?.reason;

    if (reason) {
      notifyError(reason);
    }
  }
};

class UserService {
  // eslint-disable-next-line class-methods-use-this
  public getUser = async () => {
    const user = await userApi
      .getUser()
      .then((r) => r.data)
      .catch(() => false);

    return user;
  };

  public signIn = async (d: TSignIn) => {
    const user = await userApi
      .signIn(d)
      .then(() => {
        const response = this.getUser();
        return response;
      })
      .catch(errorHandler);

    return user;
  };

  // eslint-disable-next-line class-methods-use-this
  public signUp = async (d: TSignUp) => {
    const user = await userApi.signUp(d).catch(errorHandler);

    return user;
  };

  // eslint-disable-next-line class-methods-use-this
  public logOut = () => userApi.logOut().catch(errorHandler);

  // eslint-disable-next-line class-methods-use-this
  public editUser = (d: TUserDTO) =>
    userApi
      .editUser(d)
      .then((response) => {
        const { data } = response;
        notifySuccess('Профиль обновлен');
        return data;
      })
      .catch(errorHandler);

  // eslint-disable-next-line class-methods-use-this
  public editPassword = (d: TChangePasswordDTO) =>
    userApi
      .editPassword(d)
      .then(() => {
        notifySuccess('Пароль успешно обновлен!');
      })
      .catch(errorHandler);

  // eslint-disable-next-line class-methods-use-this
  public getAvatar = (d: string) =>
    userApi
      .getAvatar(d)
      .then((response) => {
        const { data } = response;
        return data;
      })
      .catch(errorHandler);

  // eslint-disable-next-line class-methods-use-this
  public editAvatar = (d: Blob) =>
    userApi
      .editAvatar(d)
      .then(() => {
        notifySuccess('Аватар успешно обновлен!');
      })
      .catch(errorHandler);
}

export default new UserService();
