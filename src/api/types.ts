export type TUser = {
  id?: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name?: string;
  email: string;
  avatar?: string;
  phone: string;
  you?: boolean;
};

export type TUserDTO = Omit<TUser, 'id, avatar, you'>;

export type TSignIn = {
  login: string;
  password: string;
};

export type TPassword = {
  password: string;
  password_repeat: string;
};

export type TSignUp = TUserDTO & TPassword;
