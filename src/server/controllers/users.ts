import { Request, Response } from 'express';
import UserController from '@/../../backend/database/controllers/userController';

export function userDetail(req: Request, res: Response) {
  const { userId } = req.params;
  UserController.getUserById(Number(userId))
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({
          reason: `User with id ${userId} was not found`,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        data: { reason: `${error}` },
      });
    });
}
