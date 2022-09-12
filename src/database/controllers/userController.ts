import { SiteTheme, User, UserTheme } from '@/database/models';
import { TUserResponse } from '@/api/types';

const getUserById = (id: number): Promise<User | null> =>
  User.findOne({ where: { id } });

const getByYandexId = (yandexId: number): Promise<User | null> =>
  User.findOne({ where: { yandexId } });

const createUserFromYandexData = async (data: TUserResponse): Promise<User> => {
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

const getThemeById = async (id: User['id']) => {
  return UserTheme.findOne({ include: { model: User, where: { id } } });
};

const setThemeById = async (id: User['id'], themeId: UserTheme['id']) => {
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

export default {
  getUserById,
  getByYandexId,
  createUserFromYandexData,
  setThemeById,
  getThemeById,
};
