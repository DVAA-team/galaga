import axios, { AxiosError } from 'axios';

import { notifyError } from '@/utils/notify';
import { themeApi } from '@/api/themeApi';

type TServerError = { reason: string };

class ThemeService {
  public lastError: Error | null = null;

  private _errorHandler = (e: AxiosError) => {
    if (axios.isAxiosError(e)) {
      const error = e as AxiosError<TServerError>;
      const reason = error.response?.data?.reason;

      if (reason) {
        notifyError(reason);
      }
    }
    this.lastError = e;
    return null;
  };

  public setCSRFToken = (token: string) => themeApi.setCSRFToken(token);

  public fetchThemes = async () =>
    themeApi
      .getThemes()
      .then(({ data }) =>
        data.map(({ id, name, theme }) => ({ id, name, ...theme }))
      )
      .catch(this._errorHandler);

  public editUserTheme = async (themeId: number) =>
    themeApi.setUserTheme(themeId).catch(this._errorHandler);

  public editUserDarkMode = async ({
    userId,
    darkMode,
  }: {
    darkMode: boolean;
    userId: number;
  }) => themeApi.setUserDarkMode(userId, darkMode).catch(this._errorHandler);
}

export default new ThemeService();
