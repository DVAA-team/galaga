import type { SiteTheme } from '@/database/models';
import { AbstractHttpClient } from './AbstractHttpClient';

class ThemeApi extends AbstractHttpClient {
  public constructor() {
    super('/api/themes');
  }

  public getThemes = () => this.instance.get<SiteTheme[]>('');

  public setUserTheme = (userYandexId: number, themeId: number) =>
    this.instance.patch('/user', {
      userYandexId,
      themeId,
    });

  public setUserDarkMode = (userYandexId: number, darkMode: boolean) =>
    this.instance.patch('/user/darkMode', {
      userYandexId,
      darkMode,
    });
}

export const themeApi = new ThemeApi();
