import {
  TChangePasswordRequest,
  TForumUserResponse,
  TSingInRequest,
  TSingUpRequest,
  TUserResponse,
  TYandexOAuthSingInRequest,
} from '@/api/types';
import { TSnakeToCamelCaseNested } from '@/utils/convertNaming';

export type TUser = TSnakeToCamelCaseNested<TUserResponse>;
export type TForumUser = TSnakeToCamelCaseNested<TForumUserResponse>;
export type TSignIn = TSingInRequest;
export type TSignUp = TSnakeToCamelCaseNested<TSingUpRequest>;
export type TChangePassword = TChangePasswordRequest;
export type TYandexOAuthSingIn =
  TSnakeToCamelCaseNested<TYandexOAuthSingInRequest>;
