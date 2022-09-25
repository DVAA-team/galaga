import multer from 'multer';
import path from 'node:path';
import { NextFunction, Request, RequestHandler, Response } from 'express';

import { dbUserController } from '@/database/controllers';
import { TChangePasswordRequest, TUserUpdateRequest } from '@/api/types';
import { ApiError } from '@/server/error';

const storage = multer.diskStorage({
  destination(_req, _file, cb) {
    cb(null, path.resolve(__dirname, '../files/avatars/'));
  },
  filename(req, _file, cb) {
    if (!req.user) {
      cb(ApiError.forbidden('Требуется авторизация'), '');
      return;
    }
    cb(null, `${req.user.id}.png`);
  },
});

const upload = multer({
  storage,
}).single('avatar');

export function userDetail(req: Request, res: Response) {
  const { userId } = req.params;
  dbUserController
    .getUserById(Number(userId))
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

export const editUser = async (
  req: Request<unknown, unknown, TUserUpdateRequest>,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    next(ApiError.forbidden('Требуется авторизация'));
    return;
  }
  const updatedUserOrError = await dbUserController.update(
    req.user.id,
    req.body
  );
  if (updatedUserOrError instanceof Error) {
    next(updatedUserOrError);
    return;
  }
  res.json(updatedUserOrError);
};

export const uploadAvatar: RequestHandler[] = [
  upload,
  async (req, res, next) => {
    if (!req.user) {
      next(ApiError.forbidden('Требуется авторизация'));
      return;
    }
    const user = await dbUserController.update(req.user.id, {
      avatar: `/avatars/${req.file?.filename}`,
    });

    res.json(user);
  },
];

export const changePassword = async (
  req: Request<unknown, unknown, TChangePasswordRequest>,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    next(ApiError.forbidden('Требуется авторизация'));
    return;
  }

  const userOrError = await dbUserController.changePassword(
    req.user.id,
    req.body.oldPassword,
    req.body.newPassword
  );
  if (userOrError instanceof Error) {
    next(userOrError);
    return;
  }

  res.end('OK');
};
