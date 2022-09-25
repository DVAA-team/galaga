import type { InferAttributes, InferCreationAttributes } from 'sequelize';

import { SiteTheme, User, UserTheme } from '@/database/models';
import { TUserResponse } from '@/api/types';
import { debug as dbDebug } from '@/database/config';
import { hashingPassword, verifyingPassword } from '@/database/utils';

const debug = dbDebug.extend('userController');

export const getUserById = async (id: number) => {
  try {
    const user = await User.findOne({ where: { id } });
    if (user) {
      return user.toJSON();
    }
    return null;
  } catch (error) {
    debug('%O', error);
    return null;
  }
};

export const createUserFromYandexData = async (
  data: TUserResponse
): Promise<User> => {
  const newUser = await User.create(data);
  const starsTheme = await SiteTheme.findOne({
    where: { name: 'Stars' },
  });
  if (!starsTheme) {
    throw new Error('Нет такой темы');
  }
  await UserTheme.create({
    darkMode: true,
    ownerId: newUser.id,
    themeId: starsTheme.id,
  });
  return newUser;
};

export const getThemeById = async (id: User['id']) => {
  return UserTheme.findOne({ include: { model: User, where: { id } } });
};

export const setThemeById = async (
  id: User['id'],
  themeId: UserTheme['id']
) => {
  let userTheme = await UserTheme.findOne({
    include: { model: User, where: { id } },
  });
  if (!userTheme) {
    userTheme = new UserTheme({
      ownerId: id,
      darkMode: true,
      themeId,
    });
  } else {
    userTheme.themeId = themeId;
  }
  userTheme.save();
};

type TUserWithoutHashes = InferAttributes<
  User,
  { omit: 'salt' | 'hashedPassword' }
>;

type TUserCreate = InferCreationAttributes<
  User,
  { omit: 'salt' | 'hashedPassword' | 'id' }
> & { password?: string };

export const create = async (
  profile: TUserCreate
): Promise<TUserWithoutHashes | Error> => {
  try {
    let hashedPassword: Buffer | null = null;
    let salt: Buffer | null = null;
    if (profile.password) {
      const hashingResult = await hashingPassword(profile.password);
      hashedPassword = hashingResult.hashedPassword;
      salt = hashingResult.salt;
    }
    const user = await User.create({
      /* eslint-disable @typescript-eslint/naming-convention */
      first_name: profile.first_name,
      second_name: profile.second_name,
      email: profile.email,
      login: profile.login,
      phone: profile.phone,
      avatar: null,
      display_name: null,
      hashedPassword,
      salt,
      /* eslint-enable @typescript-eslint/naming-convention */
    });
    const starsTheme = await SiteTheme.findOne({
      where: { name: 'Stars' },
    });
    if (starsTheme) {
      await UserTheme.create({
        darkMode: true,
        ownerId: user.id,
        themeId: starsTheme.id,
      });
    }
    const {
      /* eslint-disable @typescript-eslint/no-unused-vars */
      salt: unusedSalt,
      hashedPassword: unusedHashedPassword,
      /* eslint-enable @typescript-eslint/no-unused-vars */
      ...returnUser
    } = user.toJSON();

    return returnUser;
  } catch (error) {
    debug(error);
    return new Error('Невозможно создать пользователя');
  }
};

export const getByLogin = async (
  login: string
): Promise<InferAttributes<User> | null> => {
  const user = await User.findOne({
    where: { login },
    attributes: { exclude: ['salt', 'hashedPassword'] },
  });
  return user?.toJSON() ?? null;
};

export const verifiedPassword = async (
  login: string,
  password: string
): Promise<InferAttributes<User> | boolean> => {
  const user = await getByLogin(login);
  if (!user || !user.salt || !user.hashedPassword) {
    return false;
  }
  const verified = await verifyingPassword(
    password,
    user.salt,
    user.hashedPassword
  );
  if (verified) {
    return user;
  }
  return false;
};
