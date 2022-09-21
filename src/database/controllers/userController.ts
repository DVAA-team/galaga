import type { CreationAttributes } from 'sequelize';

import { SiteTheme, User, UserTheme } from '@/database/models';
import { TUserResponse } from '@/api/types';

export const getUserById = async (id: number) => {
  const user = await User.findOne({ where: { id } });
  if (user) {
    return user.toJSON();
  }
  return null;
};

export const getByYandexId = (yandexId: number): Promise<User | null> =>
  User.findOne({ where: { yandexId } });

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

export const create = async (profile: CreationAttributes<User>) => {
  const user = await User.create(profile);
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
  return user.toJSON();
};

export const findOrCreate = async (profile: CreationAttributes<User>) => {
  const user = await User.findOne({ where: { yandexId: profile.yandexId } });
  if (!user) {
    return create(profile);
  }
  return user.toJSON();
};

// export const findByOAuthProvider = async (
//   providerName: string,
//   providerId: string
// ) => {
//   const user = await User.findOne({
//     include: {
//       model: UserOAuthData,
//       where: { provider: providerName, providerId },
//       as: 'oauthData',
//     },
//   });
//   user.oauthData;
// };
