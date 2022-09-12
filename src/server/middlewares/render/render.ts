import { dbThemeController } from '@/database/controllers';
import type { TRootState } from '@/store';
import { RequestHandler } from 'express';

import renderBundle from './renderBundle';

const renderMiddleware: RequestHandler = async (req, res) => {
  const yandexUser = res.locals.user;

  let starsTheme;
  let darkMode = true;
  let current;
  const starsThemeFromDb = await dbThemeController.getThemeByName('Stars');
  if (!starsThemeFromDb) {
    starsTheme = {
      id: 1,
      name: 'Stars',
      colorVars: {
        accent: '',
        error: '',
        info: '',
        primary: '',
        secondary: '',
        success: '',
        warning: '',
      },
      bgClass: 'bg-theme-stars',
    };
  } else {
    const { id, name, theme } = starsThemeFromDb.toJSON();
    starsTheme = { id, name, ...theme };
  }

  current = starsTheme;
  if (yandexUser) {
    const userTheme = await dbThemeController.getThemeByYandexUser(
      yandexUser.id
    );
    darkMode = userTheme?.darkMode ?? true;
    current = userTheme?.current ?? starsTheme;
  }

  const initialState: TRootState = {
    user: { profile: yandexUser },
    themes: {
      darkMode,
      current,
      list: [],
    },
  };
  const html = renderBundle({
    location: req.url,
    initialState,
  });
  res.status(200).send(html);
};

export default renderMiddleware;
