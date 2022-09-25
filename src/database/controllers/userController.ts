import {
  InferAttributes,
  InferCreationAttributes,
  UniqueConstraintError,
} from 'sequelize';

import { SiteTheme, User, UserTheme } from '@/database/models';
import { TUserUpdateRequest } from '@/api/types';
import { debug as dbDebug } from '@/database/config';
import { hashingPassword, verifyingPassword } from '@/database/utils';

const debug = dbDebug.extend('userController');

export const getUserById = async (id: number) => {
  try {
    const user = await User.findOne({
      where: { id },
      attributes: { exclude: ['id'] },
    });
    if (user) {
      const {
        /* eslint-disable @typescript-eslint/no-unused-vars */
        salt: unusedSalt,
        hashedPassword: unusedHashedPassword,
        /* eslint-enable @typescript-eslint/no-unused-vars */
        ...returnUser
      } = user.toJSON();
      return { ...returnUser, id };
    }
    return null;
  } catch (error) {
    debug('%O', error);
    return null;
  }
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
  { omit: 'salt' | 'hashedPassword' | 'id' }
> & { id: number };

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
      id,
      /* eslint-disable @typescript-eslint/no-unused-vars */
      salt: unusedSalt,
      hashedPassword: unusedHashedPassword,
      /* eslint-enable @typescript-eslint/no-unused-vars */
      ...returnUser
    } = user.toJSON();

    return { ...returnUser, id };
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      return new Error('Пользователь с таким логином уже существует');
    }
    debug('%O', error);
    return new Error('Невозможно создать пользователя');
  }
};

export const getByLogin = async (
  login: string
): Promise<TUserWithoutHashes | null> => {
  const user = await User.findOne({
    where: { login },
    attributes: { exclude: ['salt', 'hashedPassword'] },
  });
  return user?.toJSON() ?? null;
};

export const verifiedPassword = async (
  login: string,
  password: string
): Promise<TUserWithoutHashes | boolean> => {
  const user = await User.findOne({
    where: { login },
  });
  if (!user || !user.salt || !user.hashedPassword) {
    return false;
  }
  const verified = await verifyingPassword(
    password,
    user.salt,
    user.hashedPassword
  );
  if (verified) {
    const {
      /* eslint-disable @typescript-eslint/no-unused-vars */
      salt: unusedSalt,
      hashedPassword: unusedHashedPassword,
      /* eslint-enable @typescript-eslint/no-unused-vars */
      ...returnUser
    } = user.toJSON();
    return returnUser;
  }
  return false;
};

export const update = async (
  id: number,
  profile: Partial<TUserUpdateRequest & { avatar: string }>
) => {
  let user = await User.findByPk(id);
  if (!user) {
    return new Error('Пользователь не найден');
  }
  user = await user.update(profile);
  const {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    salt: unusedSalt,
    hashedPassword: unusedHashedPassword,
    /* eslint-enable @typescript-eslint/no-unused-vars */
    ...returnUser
  } = user.toJSON();
  return { ...returnUser, id };
};

export const changePassword = async (
  id: number,
  oldPassword: string,
  newPassword: string
) => {
  let user = await User.findByPk(id);
  if (!user) {
    return new Error('Пользователя не существует');
  }
  if (!user.salt || !user.hashedPassword) {
    return new Error('Нельзя установить пароль для пользователя OAuth2');
  }
  const verified = await verifyingPassword(
    oldPassword,
    user.salt,
    user.hashedPassword
  );

  if (!verified) {
    return new Error('Старый пароль не верен');
  }

  const { hashedPassword, salt } = await hashingPassword(newPassword);
  user.salt = salt;
  user.hashedPassword = hashedPassword;
  user = await user.save();
  const {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    salt: unusedSalt,
    hashedPassword: unusedHashedPassword,
    /* eslint-enable @typescript-eslint/no-unused-vars */
    ...returnUser
  } = user.toJSON();
  return returnUser;
};
