import { appConstants } from '@/config';
import { AbstractHttpClient } from './AbstractHttpClient';
import { TLeaderboardRequest } from './types';

class LeaderboardApi extends AbstractHttpClient {
  public constructor() {
    super(appConstants.localApiBaseURL);
  }

  public addToLeaderboard = (data: TLeaderboardRequest) =>
    this.instance.post('/leaderboard', data);

  public getLeaders = () => this.instance.get('/leaderboard');
}

export const leaderboardApi = new LeaderboardApi();
