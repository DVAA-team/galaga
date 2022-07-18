export type TUser = {
  // FIXME
  /* eslint-disable @typescript-eslint/naming-convention */
  id?: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name?: string;
  email: string;
  avatar?: string;
  phone: string;
  you?: boolean;
  /* eslint-enable @typescript-eslint/naming-convention */
};

export type TUserDTO = Omit<TUser, 'id' | 'avatar' | 'you'>;

export type TSignIn = {
  login: string;
  password: string;
};

export type TPassword = {
  // FIXME
  /* eslint-disable @typescript-eslint/naming-convention */
  password: string;
  password_repeat: string;
  /* eslint-enable @typescript-eslint/naming-convention */
};

export type TSignUp = TUserDTO & TPassword;

export type TChangePassword = {
  oldPassword: string;
  newPassword: string;
  newPasswordRepeat: string;
};

export type TChangePasswordDTO = Omit<TChangePassword, 'newPassword_repeat'>;
