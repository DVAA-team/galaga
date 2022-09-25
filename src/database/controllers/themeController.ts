import { SiteTheme, User, UserTheme } from '@/database/models';

export const getAllThemes = (): Promise<SiteTheme[]> => {
  return SiteTheme.findAll();
};

export const getThemeByName = (name: string) => {
  return SiteTheme.findOne({ where: { name: `%${name}%` } });
};

export const getThemeByUser = async (userId: number) => {
  const userTheme = await UserTheme.findOne({
    include: {
      model: User,
      attributes: { exclude: ['salt', 'hashedPassword'] },
      where: { id: userId },
    },
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

export const setThemeByUser = async (userId: number, themeId: number) => {
  const userTheme = await UserTheme.findOne({
    include: {
      model: User,
      attributes: { exclude: ['salt', 'hashedPassword'] },
      where: { id: userId },
    },
  });
  if (!userTheme) {
    return false;
  }
  userTheme.themeId = themeId;
  await userTheme.save();
  return true;
};

export const getThemeById = async (ownerId: number) => {
  const userTheme = await UserTheme.findOne({
    where: { ownerId },
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

export const setThemeById = async (ownerId: number, themeId: number) => {
  const userTheme = await UserTheme.findOne({
    where: { ownerId },
  });
  if (!userTheme) {
    return false;
  }
  userTheme.themeId = themeId;
  await userTheme.save();
  return true;
};

export const getDarkModeById = async (ownerId: number) => {
  const userTheme = await UserTheme.findOne({
    where: { ownerId },
  });
  if (!userTheme) {
    return null;
  }
  return userTheme.darkMode;
};

export const setDarkModeById = async (ownerId: number, darkMode: boolean) => {
  const userTheme = await UserTheme.findOne({
    where: { ownerId },
  });
  if (!userTheme) {
    return false;
  }
  userTheme.darkMode = darkMode;
  await userTheme.save();
  return true;
};

export const getDarkModeByUser = async (userId: number) => {
  const userTheme = await UserTheme.findOne({
    include: {
      model: User,
      attributes: { exclude: ['salt', 'hashedPassword'] },
      where: { id: userId },
    },
  });
  if (!userTheme) {
    return null;
  }
  return userTheme.darkMode;
};

export const setDarkModeByUser = async (userId: number, darkMode: boolean) => {
  const userTheme = await UserTheme.findOne({
    include: {
      model: User,
      attributes: { exclude: ['salt', 'hashedPassword'] },
      where: { id: userId },
    },
  });
  if (!userTheme) {
    return false;
  }
  userTheme.darkMode = darkMode;
  await userTheme.save();
  return true;
};
