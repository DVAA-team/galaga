import { Request, Response, NextFunction } from 'express';
import { dbCommentController } from '@/database/controllers';
import { ApiError } from '@/server/error';

class CommentsController {
  // eslint-disable-next-line class-methods-use-this,consistent-return
  async getComment(req: Request, res: Response, next: NextFunction) {
    const { commentId, messageId } = req.params;
    const { user } = res.locals;
    const { yandexId } = user;

    try {
      const comment = await dbCommentController.getCommentByMessageIdAndId(
        Number(messageId),
        Number(commentId),
        Number(yandexId)
      );
      if (comment) {
        res.status(200).json(comment.toJSON());
      } else {
        return next(
          ApiError.badRequest(`Комментарий с id ${commentId} не найдено`)
        );
      }
    } catch (err) {
      return next(
        ApiError.badRequest(`Комментарий с id ${commentId} не найдено`)
      );
    }
  }

  // eslint-disable-next-line class-methods-use-this,consistent-return
  async createComment(req: Request, res: Response, next: NextFunction) {
    const { text } = req.body;
    const { messageId } = req.params;

    const { user } = res.locals;
    const userId = user.id;

    if (!text) {
      return next(ApiError.badRequest('Не задан text'));
    }

    if (!messageId) {
      return next(ApiError.badRequest('Не задан message id'));
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
        return next(ApiError.badRequest('Не получилось создать сообщение'));
      }
    } catch (err) {
      return next(ApiError.badRequest('Не получилось создать сообщение'));
    }
  }

  // eslint-disable-next-line consistent-return,class-methods-use-this
  async updateComment(req: Request, res: Response, next: NextFunction) {
    const { text } = req.body;
    const { commentId, messageId } = req.params;
    const { user } = res.locals;
    const { yandexId } = user;

    if (!text) {
      return next(ApiError.badRequest('Не задан text'));
    }

    if (!commentId) {
      return next(ApiError.badRequest('Не задан comment id'));
    }

    if (!messageId) {
      return next(ApiError.badRequest('Не задан message id'));
    }

    try {
      const comment = await dbCommentController.updateComment({
        text,
        messageId: Number(messageId),
        commentId: Number(commentId),
        yandexId: Number(yandexId),
      });
      if (comment) {
        res.status(200).json(comment.toJSON());
      } else {
        return next(ApiError.badRequest('Не получилось обновить пост'));
      }
    } catch (err) {
      return next(ApiError.badRequest('Не получилось обновить пост'));
    }
  }

  // eslint-disable-next-line consistent-return,class-methods-use-this
  async deleteComment(req: Request, res: Response, next: NextFunction) {
    const { commentId, messageId } = req.params;

    if (!messageId) {
      return next(ApiError.badRequest('Не задан message id'));
    }

    try {
      await dbCommentController.deleteComment({
        commentId: Number(commentId),
        messageId: Number(messageId),
      });
      res.status(204).end();
    } catch (err) {
      return next(ApiError.badRequest('Не получилось удалить пост'));
    }
  }

  // eslint-disable-next-line class-methods-use-this,consistent-return
  async getComments(req: Request, res: Response, next: NextFunction) {
    const { messageId } = req.params;
    const { user } = res.locals;
    const { yandexId } = user;

    if (!messageId) {
      return next(ApiError.badRequest('Не задан message id'));
    }

    const comments = await dbCommentController.getComments({
      messageId: Number(messageId),
      yandexId: Number(yandexId),
    });
    res.status(200).json(comments.map((comment) => comment.toJSON()));
  }
}

export default new CommentsController();
