export type TSingUpRequest = {
  /* eslint-disable @typescript-eslint/naming-convention */
  login: string;
  first_name: string;
  second_name: string;
  email: string;
  phone: string;
  password: string;
  /* eslint-enable @typescript-eslint/naming-convention */
};

export type TSignUpResponse = {
  id: number;
};

export type TSingInRequest = {
  login: string;
  password: string;
};

export type TUserResponse = {
  /* eslint-disable @typescript-eslint/naming-convention */
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string | null;
  email: string;
  avatar: string | null;
  phone: string;
  isOAuth2User: boolean;
  /* eslint-enable @typescript-eslint/naming-convention */
};

export type TUserUpdateRequest = {
  /* eslint-disable @typescript-eslint/naming-convention */
  login: string;
  first_name: string;
  second_name: string;
  display_name: string | null;
  email: string;
  phone: string;
  /* eslint-enable @typescript-eslint/naming-convention */
};

export type TChangePasswordRequest = {
  oldPassword: string;
  newPassword: string;
};

export type TChangeAvatarRequest = {
  avatar: File;
};

export type TBabRequestError = {
  reason: string;
};

export type TYandexOAuthSingInRequest = {
  /* eslint-disable @typescript-eslint/naming-convention */
  code: string;
  redirect_uri: string;
  /* eslint-enable @typescript-eslint/naming-convention */
};

export type TForumUserResponse = TUserResponse & {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  avatar_url: string | null;
};

export type TForumPost = {
  id: number;
  title: string;
  userId: number;
  createdAt: string | null;
  updatedAt: string | null;
  user: TForumUserResponse;
};

export type TForumMessage = {
  id: number;
  text: string;
  userId: number;
  postId: number;
  messageId?: number | null;
  createdAt: string | null;
  updatedAt: string | null;
  user: TForumUserResponse;
};

export type TForumComment = {
  id: number;
  text: string;
  userId: number;
  postId: number;
  messageId: number;
  createdAt: string | null;
  updatedAt: string | null;
  user: TForumUserResponse;
};
