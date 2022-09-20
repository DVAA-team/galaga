import { Router } from 'express';
import { LeaderboardController } from '@/server/controllers';

const router: Router = Router();

router
  .route('/leaderboard')
  .post(LeaderboardController.addToLeaderboard)
  .get(LeaderboardController.getLeaders);

export default router;
