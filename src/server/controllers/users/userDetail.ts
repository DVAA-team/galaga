import { Request, Response } from 'express';
import { dbUserController } from '@/database/controllers';

export default function userDetail(req: Request, res: Response) {
  const { userId } = req.params;
  dbUserController
    .getUserById(Number(userId))
    .then((user) => {
      if (user) {
        res.status(200).json(user.toJSON());
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
