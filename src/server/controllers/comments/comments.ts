import { Request, Response, NextFunction } from 'express';
import { dbCommentController } from '@/database/controllers';
import { ApiError } from '@/server/error';

class CommentsController {
  async getComment(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      next(ApiError.forbidden('Необходимо авторизация'));
      return;
    }

    const { commentId, messageId } = req.params;

    try {
      const comment = await dbCommentController.getCommentByMessageIdAndId(
        Number(messageId),
        Number(commentId)
      );
      if (comment) {
        res.status(200).json(comment.toJSON());
      } else {
        next(ApiError.badRequest(`Комментарий с id ${commentId} не найдено`));
      }
    } catch (err) {
      next(ApiError.badRequest(`Комментарий с id ${commentId} не найдено`));
    }
  }

  async createComment(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      next(ApiError.forbidden('Необходимо авторизация'));
      return;
    }

    const { text } = req.body;
    const { messageId } = req.params;

    const { user } = req;
    const userId = user.id;

    if (!text) {
      next(ApiError.badRequest('Не задан text'));
      return;
    }

    if (!messageId) {
      next(ApiError.badRequest('Не задан message id'));
      return;
    }

    try {
      const comment = await dbCommentController.createComment({
        text,
        messageId: Number(messageId),
        userId,
      });
      if (comment) {
        res.status(201).json(comment.toJSON());
      } else {
        next(ApiError.badRequest('Не получилось создать сообщение'));
      }
    } catch (err) {
      next(ApiError.badRequest('Не получилось создать сообщение'));
    }
  }

  async updateComment(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      next(ApiError.forbidden('Необходимо авторизация'));
      return;
    }

    const { text } = req.body;
    const { commentId, messageId } = req.params;

    if (!text) {
      next(ApiError.badRequest('Не задан text'));
      return;
    }

    if (!commentId) {
      next(ApiError.badRequest('Не задан comment id'));
      return;
    }

    if (!messageId) {
      next(ApiError.badRequest('Не задан message id'));
      return;
    }

    try {
      const comment = await dbCommentController.updateComment({
        text,
        messageId: Number(messageId),
        commentId: Number(commentId),
      });
      if (comment) {
        res.status(200).json(comment.toJSON());
      } else {
        next(ApiError.badRequest('Не получилось обновить пост'));
      }
    } catch (err) {
      next(ApiError.badRequest('Не получилось обновить пост'));
    }
  }

  async deleteComment(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      next(ApiError.forbidden('Необходимо авторизация'));
      return;
    }

    const { commentId, messageId } = req.params;

    if (!messageId) {
      next(ApiError.badRequest('Не задан message id'));
      return;
    }

    try {
      await dbCommentController.deleteComment({
        commentId: Number(commentId),
        messageId: Number(messageId),
      });
      res.status(204).end();
    } catch (err) {
      next(ApiError.badRequest('Не получилось удалить пост'));
    }
  }

  async getComments(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      next(ApiError.forbidden('Необходимо авторизация'));
      return;
    }

    const { messageId } = req.params;

    if (!messageId) {
      next(ApiError.badRequest('Не задан message id'));
      return;
    }

    const comments = await dbCommentController.getComments({
      messageId: Number(messageId),
    });
    res.status(200).json(comments.map((comment) => comment.toJSON()));
  }
}

export default new CommentsController();
