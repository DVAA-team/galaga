import { dbThemeController } from '@/database/controllers';
import { ApiError } from '@/server/error';
import { NextFunction, Request, Response } from 'express';

export async function getThemes(_req: Request, res: Response) {
  const themes = await dbThemeController.getAllThemes();
  res.status(200).json(themes.map((post) => post.toJSON()));
}

export async function setUserTheme(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.user) {
    next(ApiError.forbidden('Необходимо авторизоваться'));
    return;
  }
  const { id: userId } = req.user;
  const { themeId } = req.body;
  const save = await dbThemeController.setThemeByUser(userId, themeId);
  res.status(200).json({ save });
}

export async function setUserDarkMode(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.user) {
    next(ApiError.forbidden('Необходимо авторизоваться'));
    return;
  }
  const { id: userId } = req.user;
  const { darkMode } = req.body;
  const save = await dbThemeController.setDarkModeByUser(userId, darkMode);
  res.status(200).json({ save });
}
