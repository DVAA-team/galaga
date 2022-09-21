import type { SiteTheme } from '@/database/models';
import { AbstractHttpClient } from './AbstractHttpClient';

class ThemeApi extends AbstractHttpClient {
  public constructor() {
    super('/api/themes');
  }

  public getThemes = () => this.instance.get<SiteTheme[]>('');

  public setUserTheme = (userYandexId: number, themeId: number) =>
    this.getCSRFToken().then(() =>
      this.instance.patch('/user', {
        userYandexId,
        themeId,
      })
    );

  public setUserDarkMode = (userId: number, darkMode: boolean) =>
    this.getCSRFToken().then(() =>
      this.instance.patch('/user/darkMode', {
        userId,
        darkMode,
      })
    );
}

export const themeApi = new ThemeApi();
