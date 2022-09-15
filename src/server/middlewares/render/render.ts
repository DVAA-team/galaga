import { dbThemeController } from '@/database/controllers';
import type { TRootState } from '@/store';
import { RequestHandler } from 'express';

import renderBundle from './renderBundle';

const renderMiddleware: RequestHandler = async (req, res) => {
  const { user } = res.locals;

  let starsTheme;
  let darkMode = true;
  let current;
  let profile = null;

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
  if (user) {
    const userTheme = await dbThemeController.getThemeByUser(user.id);
    darkMode = userTheme?.darkMode ?? true;
    current = userTheme?.current ?? starsTheme;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { yandexId, ...userProfile } = user;
    profile = userProfile;
  }

  const initialState: TRootState = {
    user: { profile },
    themes: {
      darkMode,
      current,
      list: [],
    },
    forum: {
      posts: [],
      currentPost: null,
    },
  };
  const html = renderBundle({
    location: req.url,
    initialState,
  });
  res.status(200).send(html);
};

export default renderMiddleware;
