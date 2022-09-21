export type TYandexUserInfo = {
  /* eslint-disable @typescript-eslint/naming-convention */
  id: string;
  login: string;
  client_id: string;
  display_name: string;
  real_name: string;
  first_name: string;
  last_name: string;
  sex: string;
  default_email: string;
  emails: string[];
  default_avatar_id: string;
  is_avatar_empty: boolean;
  psuid: string;
  /* eslint-enable @typescript-eslint/naming-convention */
};

export type TYandexTokenResponse = {
  /* eslint-disable @typescript-eslint/naming-convention */
  token_type: string;
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  /* eslint-enable @typescript-eslint/naming-convention */
};
