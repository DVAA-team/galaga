import { Request, Response, NextFunction } from 'express';
import { dbMessageController } from '@/database/controllers';
import { ApiError } from '@/server/error';

class MessagesController {
  async getMessage(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      next(ApiError.forbidden('Необходимо авторизация'));
      return;
    }

    const { messageId, postId } = req.params;

    try {
      const message = await dbMessageController.getMessageByPostIdAndId(
        Number(postId),
        Number(messageId)
      );
      if (message) {
        res.status(200).json(message.toJSON());
      } else {
        next(ApiError.badRequest(`Сообщение с id ${messageId} не найдено`));
      }
    } catch (err) {
      next(ApiError.badRequest(`Сообщение с id ${messageId} не найдено`));
    }
  }

  async createMessage(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      next(ApiError.forbidden('Необходимо авторизация'));
      return;
    }

    const { text } = req.body;
    const { postId } = req.params;

    const { user } = req;
    const userId = user.id;

    if (!text) {
      next(ApiError.badRequest('Не задан text'));
      return;
    }

    if (!postId) {
      next(ApiError.badRequest('Не задан post id'));
      return;
    }

    try {
      const message = await dbMessageController.createMessage({
        text,
        postId: Number(postId),
        userId,
      });
      if (message) {
        res.status(201).json(message.toJSON());
      } else {
        next(ApiError.badRequest('Не получилось создать сообщение'));
      }
    } catch (err) {
      next(ApiError.badRequest('Не получилось создать сообщение'));
    }
  }

  async updateMessage(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      next(ApiError.forbidden('Необходимо авторизация'));
      return;
    }

    const { text } = req.body;
    const { messageId, postId } = req.params;

    if (!text) {
      next(ApiError.badRequest('Не задан text'));
      return;
    }

    if (!messageId) {
      next(ApiError.badRequest('Не задан message id'));
      return;
    }

    if (!postId) {
      next(ApiError.badRequest('Не задан post id'));
      return;
    }

    try {
      const message = await dbMessageController.updateMessage({
        text,
        postId: Number(postId),
        messageId: Number(messageId),
      });
      if (message) {
        res.status(200).json(message.toJSON());
      } else {
        next(ApiError.badRequest('Не получилось обновить пост'));
      }
    } catch (err) {
      next(ApiError.badRequest('Не получилось обновить пост'));
    }
  }

  async deleteMessage(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      next(ApiError.forbidden('Необходимо авторизация'));
      return;
    }

    const { messageId, postId } = req.params;

    if (!postId) {
      next(ApiError.badRequest('Не задан post id'));
      return;
    }

    try {
      await dbMessageController.deleteMessage({
        messageId: Number(messageId),
        postId: Number(postId),
      });
      res.status(204).end();
    } catch (err) {
      next(ApiError.badRequest('Не получилось удалить пост'));
    }
  }

  async getMessages(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      next(ApiError.forbidden('Необходимо авторизация'));
      return;
    }

    const { postId } = req.params;

    if (!postId) {
      next(ApiError.badRequest('Не задан post id'));
      return;
    }

    const messages = await dbMessageController.getMessages(Number(postId));
    res.status(200).json(messages.map((message) => message.toJSON()));
  }
}

export default new MessagesController();
