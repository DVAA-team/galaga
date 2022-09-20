import axios, { AxiosError } from 'axios';

import { notifyError, notifySuccess } from '@/utils/notify';
import { TLeaderboardRequest } from '@/api/types';
import { leaderboardApi } from '@/api/leaderboardApi';

type TServerError = { reason: string };

class LeaderboardService {
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

  public addToLeaderboard = (d: TLeaderboardRequest) =>
    leaderboardApi
      .addToLeaderboard(d)
      .then(({ data }) => {
        const { position } = data;
        switch (position) {
          case 0:
            notifySuccess('Победа! Твой результат лучше всех!');
            break;
          case 1:
            notifySuccess('Ты на втором месте - отличный результат!');
            break;
          case 2:
            notifySuccess('У тебя бронзовая медаль лидера!');
            break;
          default:
            notifySuccess('Твой результат добавлен в таблицу лидеров!');
        }
        return data;
      })
      .catch(this._errorHandler);

  // eslint-disable-next-line class-methods-use-this
  public getAllLeaders = () =>
    leaderboardApi
      .getLeaders()
      .then(({ data }) => data)
      .catch(() => []);
}

export default new LeaderboardService();
