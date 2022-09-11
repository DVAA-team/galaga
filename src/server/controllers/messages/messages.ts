import { Request, Response, NextFunction } from 'express';
import { dbMessageController } from '@/database/controllers';
import { ApiError } from '@/server/error';

class MessagesController {
  // eslint-disable-next-line class-methods-use-this,consistent-return
  async getMessage(req: Request, res: Response, next: NextFunction) {
    const { messageId, postId } = req.params;
    const { user } = res.locals;
    const { yandexId } = user;

    try {
      const message = await dbMessageController.getMessageByPostIdAndId(
        Number(postId),
        Number(messageId),
        Number(yandexId)
      );
      if (message) {
        res.status(200).json(message.toJSON());
      } else {
        return next(
          ApiError.badRequest(`Сообщение с id ${messageId} не найдено`)
        );
      }
    } catch (err) {
      return next(
        ApiError.badRequest(`Сообщение с id ${messageId} не найдено`)
      );
    }
  }

  // eslint-disable-next-line class-methods-use-this,consistent-return
  async createMessage(req: Request, res: Response, next: NextFunction) {
    const { text } = req.body;
    const { postId } = req.params;

    const { user } = res.locals;
    const userId = user.id;

    if (!text) {
      return next(ApiError.badRequest('Не задан text'));
    }

    if (!postId) {
      return next(ApiError.badRequest('Не задан post id'));
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
        return next(ApiError.badRequest('Не получилось создать сообщение'));
      }
    } catch (err) {
      return next(ApiError.badRequest('Не получилось создать сообщение'));
    }
  }

  // eslint-disable-next-line consistent-return,class-methods-use-this
  async updateMessage(req: Request, res: Response, next: NextFunction) {
    const { text } = req.body;
    const { messageId, postId } = req.params;
    const { user } = res.locals;
    const { yandexId } = user;

    if (!text) {
      return next(ApiError.badRequest('Не задан text'));
    }

    if (!messageId) {
      return next(ApiError.badRequest('Не задан message id'));
    }

    if (!postId) {
      return next(ApiError.badRequest('Не задан post id'));
    }

    try {
      const message = await dbMessageController.updateMessage({
        text,
        postId: Number(postId),
        messageId: Number(messageId),
        yandexId: Number(yandexId),
      });
      if (message) {
        res.status(200).json(message.toJSON());
      } else {
        return next(ApiError.badRequest('Не получилось обновить пост'));
      }
    } catch (err) {
      return next(ApiError.badRequest('Не получилось обновить пост'));
    }
  }

  // eslint-disable-next-line consistent-return,class-methods-use-this
  async deleteMessage(req: Request, res: Response, next: NextFunction) {
    const { messageId, postId } = req.params;

    if (!postId) {
      return next(ApiError.badRequest('Не задан post id'));
    }

    try {
      await dbMessageController.deleteMessage({
        messageId: Number(messageId),
        postId: Number(postId),
      });
      res.status(204).end();
    } catch (err) {
      return next(ApiError.badRequest('Не получилось удалить пост'));
    }
  }

  // eslint-disable-next-line class-methods-use-this,consistent-return
  async getMessages(req: Request, res: Response, next: NextFunction) {
    const { postId } = req.params;
    const { user } = res.locals;
    const { yandexId } = user;

    if (!postId) {
      return next(ApiError.badRequest('Не задан post id'));
    }

    const messages = await dbMessageController.getMessages({
      postId: Number(postId),
      yandexId: Number(yandexId),
    });
    res.status(200).json(messages.map((message) => message.toJSON()));
  }
}

export default new MessagesController();
