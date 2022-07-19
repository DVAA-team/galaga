import { TChangePasswordDTO, TSignIn, TSignUp, TUserDTO } from '../api/types';
import { notifyError, notifySuccess } from '../utils/notify';
import { userApi } from '../api/userApi';

class UserService {
  // eslint-disable-next-line class-methods-use-this
  public getUser = async () => {
    const user = await userApi
      .getUser()
      .then((r) => r.data)
      .catch(({ response }) => {
        const reason = response?.data?.reason;

        if (reason) {
          throw new Error(reason);
        }
      });

    return user;
  };

  public signIn = async (d: TSignIn) => {
    const user = await userApi
      .signIn(d)
      .then(() => {
        const response = this.getUser();
        return response;
      })
      .catch(({ response }) => {
        const reason = response?.data?.reason;

        if (reason) {
          notifyError(reason);
        }
      });

    return user;
  };

  // eslint-disable-next-line class-methods-use-this
  public signUp = async (d: TSignUp) => {
    const user = await userApi.signUp(d).catch(({ response }) => {
      const reason = response?.data?.reason;

      if (reason) {
        notifyError(reason);
      }
    });

    return user;
  };

  // eslint-disable-next-line class-methods-use-this
  public logOut = () =>
    userApi.logOut().catch(({ response }) => {
      const reason = response?.data?.reason;

      if (reason) {
        notifyError(reason);
      }
    });

  // eslint-disable-next-line class-methods-use-this
  public editUser = (d: TUserDTO) =>
    userApi
      .editUser(d)
      .then((response) => {
        const { data } = response;
        notifySuccess('Профиль обновлен');
        return data;
      })
      .catch(({ response }) => {
        const reason = response?.data?.reason;

        if (reason) {
          notifyError(reason);
        }
      });

  // eslint-disable-next-line class-methods-use-this
  public editPassword = (d: TChangePasswordDTO) =>
    userApi
      .editPassword(d)
      .then(() => {
        notifySuccess('Пароль успешно обновлен!');
      })
      .catch(({ response }) => {
        const reason = response?.data?.reason;

        if (reason) {
          notifyError(reason);
        }
      });

  // eslint-disable-next-line class-methods-use-this
  public getAvatar = (d: string) =>
    userApi
      .getAvatar(d)
      .then((response) => {
        const { data } = response;
        return data;
      })
      .catch(({ response }) => {
        const reason = response?.data?.reason;

        if (reason) {
          notifyError(reason);
        }
      });

  // eslint-disable-next-line class-methods-use-this
  public editAvatar = (d: Blob) =>
    userApi
      .editAvatar(d)
      .then(() => {
        notifySuccess('Аватар успешно обновлен!');
      })
      .catch(({ response }) => {
        const reason = response?.data?.reason;

        if (reason) {
          notifyError(reason);
        }
      });
}

export default new UserService();
