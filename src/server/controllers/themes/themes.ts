import { dbThemeController } from '@/database/controllers';
import { Request, Response } from 'express';

export async function getThemes(_req: Request, res: Response) {
  const themes = await dbThemeController.getAllThemes();
  res.status(200).json(themes.map((post) => post.toJSON()));
}

export async function setUserTheme(req: Request, res: Response) {
  const { userYandexId, themeId } = req.body;
  const save = await dbThemeController.setThemeByYandexUser(
    userYandexId,
    themeId
  );
  res.status(200).json({ save });
}

export async function setUserDarkMode(req: Request, res: Response) {
  const { userYandexId, darkMode } = req.body;
  const save = await dbThemeController.setDarkModeByYandexUser(
    userYandexId,
    darkMode
  );
  res.status(200).json({ save });
}
