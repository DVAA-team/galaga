import { NextFunction, Request, Response } from 'express';
import { dbLeaderboardController } from '@/database/controllers';
import { ApiError } from '@/server/error';

class LeaderboardController {
  async addToLeaderboard(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      next(ApiError.forbidden('Необходимо авторизация'));
      return;
    }

    const { score } = req.body;
    const { user } = req;
    const userId = user.id;
    if (!user) {
      next(ApiError.badRequest('Не задан user'));
      return;
    }

    try {
      let leaders = await dbLeaderboardController.getLeaders();
      const prePosition = leaders.findIndex((item) => item.userId === userId);
      const leader = await dbLeaderboardController.updateLeader({
        userId: Number(userId),
        score,
      });
      if (leader) {
        leaders = await dbLeaderboardController.getLeaders();
        const position = leaders.findIndex((item) => item.userId === userId);
        res.status(201).json({ prePosition, position, ...leader.toJSON() });
      } else {
        next(ApiError.badRequest('Не получилось добавить лидера'));
      }
    } catch (err) {
      next(ApiError.badRequest('Не получилось добавить лидера'));
    }
  }

  async getLeaders(_req: Request, res: Response) {
    const leaders = await dbLeaderboardController.getLeaders();
    res.status(200).json(leaders.map((leader) => leader.toJSON()));
  }
}

export default new LeaderboardController();
