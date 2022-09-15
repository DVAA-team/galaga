import { SiteTheme, User, UserTheme } from '@/database/models';

const getAllThemes = (): Promise<SiteTheme[]> => {
  return SiteTheme.findAll();
};

const getThemeByName = (name: string) => {
  return SiteTheme.findOne({ where: { name: `%${name}%` } });
};

const getThemeByUser = async (userId: number) => {
  const userTheme = await UserTheme.findOne({
    include: { model: User, where: { id: userId } },
  });
  if (!userTheme) {
    return null;
  }
  const siteTheme = await SiteTheme.findByPk(userTheme.themeId);
  if (!siteTheme) {
    return null;
  }
  const { darkMode } = userTheme.toJSON();
  const { id, name, theme } = siteTheme.toJSON();
  return { darkMode, current: { id, name, ...theme } };
};

const setThemeByUser = async (userId: number, themeId: number) => {
  const userTheme = await UserTheme.findOne({
    include: { model: User, where: { id: userId } },
  });
  if (!userTheme) {
    return false;
  }
  userTheme.themeId = themeId;
  await userTheme.save();
  return true;
};

const getThemeByYandexUser = async (yandexId: number) => {
  const userTheme = await UserTheme.findOne({
    include: { model: User, where: { yandexId } },
  });
  if (!userTheme) {
    return null;
  }
  const siteTheme = await SiteTheme.findByPk(userTheme.themeId);
  if (!siteTheme) {
    return null;
  }
  const { darkMode } = userTheme.toJSON();
  const { id, name, theme } = siteTheme.toJSON();
  return { darkMode, current: { id, name, ...theme } };
};

const setThemeByYandexUser = async (yandexId: number, themeId: number) => {
  const userTheme = await UserTheme.findOne({
    include: { model: User, where: { yandexId } },
  });
  if (!userTheme) {
    return false;
  }
  userTheme.themeId = themeId;
  await userTheme.save();
  return true;
};

const getDarkModeByYandexUser = async (yandexId: number) => {
  const userTheme = await UserTheme.findOne({
    include: { model: User, where: { yandexId } },
  });
  if (!userTheme) {
    return null;
  }
  return userTheme.darkMode;
};

const setDarkModeByYandexUser = async (yandexId: number, darkMode: boolean) => {
  const userTheme = await UserTheme.findOne({
    include: { model: User, where: { yandexId } },
  });
  if (!userTheme) {
    return false;
  }
  userTheme.darkMode = darkMode;
  await userTheme.save();
  return true;
};

const getDarkModeByUser = async (userId: number) => {
  const userTheme = await UserTheme.findOne({
    include: { model: User, where: { id: userId } },
  });
  if (!userTheme) {
    return null;
  }
  return userTheme.darkMode;
};

const setDarkModeByUser = async (userId: number, darkMode: boolean) => {
  const userTheme = await UserTheme.findOne({
    include: { model: User, where: { id: userId } },
  });
  if (!userTheme) {
    return false;
  }
  userTheme.darkMode = darkMode;
  await userTheme.save();
  return true;
};

export default {
  getAllThemes,
  getThemeByName,
  getThemeByYandexUser,
  setThemeByYandexUser,
  getDarkModeByYandexUser,
  setDarkModeByYandexUser,
  getThemeByUser,
  setThemeByUser,
  getDarkModeByUser,
  setDarkModeByUser,
};
