import { Request, Response, NextFunction } from 'express';
import { dbPostController, dbUserController } from '@/database/controllers';
import { ApiError } from '@/server/error';

class PostsController {
  // eslint-disable-next-line class-methods-use-this,consistent-return
  async getPost(req: Request, res: Response, next: NextFunction) {
    const { postId } = req.params;

    try {
      const post = await dbPostController.getPostById(Number(postId));
      if (post) {
        res.status(200).json(post.toJSON());
      } else {
        return next(ApiError.badRequest(`Пост с id ${postId} не найден`));
      }
    } catch (err) {
      return next(ApiError.badRequest(`Пост с id ${postId} не найден`));
    }
  }

  // eslint-disable-next-line class-methods-use-this,consistent-return
  async createPost(req: Request, res: Response, next: NextFunction) {
    const { title } = req.body;

    const { userRaw: yandexUser } = res.locals;

    if (!yandexUser) {
      return next(ApiError.forbidden('Пользователь не найден'));
    }

    const { id: yandexId, ...rest } = yandexUser;

    const userFromDb = await dbUserController.getByYandexId(yandexId);

    let userId;

    if (!userFromDb) {
      const user = await dbUserController.createUserFromYandexData({
        ...rest,
        yandexId,
      });
      userId = user.id;
    } else {
      userId = userFromDb.id;
    }

    if (!title) {
      return next(ApiError.badRequest('Не задан title'));
    }

    try {
      const post = await dbPostController.createPost({
        title,
        userId: Number(userId),
      });
      if (post) {
        res.status(201).json(post.toJSON());
      } else {
        return next(ApiError.badRequest('Не получилось создать пост'));
      }
    } catch (err) {
      return next(ApiError.badRequest('Не получилось создать пост'));
    }
  }

  // eslint-disable-next-line consistent-return,class-methods-use-this
  async updatePost(req: Request, res: Response, next: NextFunction) {
    const { title } = req.body;
    const { postId } = req.params;

    if (!title) {
      return next(ApiError.badRequest('Не задан title'));
    }

    if (!postId) {
      return next(ApiError.badRequest('Не задан post id'));
    }

    try {
      const post = await dbPostController.updatePost({
        title,
        postId: Number(postId),
      });
      if (post) {
        res.status(200).json(post.toJSON());
      } else {
        return next(ApiError.badRequest('Не получилось обновить пост'));
      }
    } catch (err) {
      return next(ApiError.badRequest('Не получилось обновить пост'));
    }
  }

  // eslint-disable-next-line consistent-return,class-methods-use-this
  async deletePost(req: Request, res: Response, next: NextFunction) {
    const { postId } = req.params;

    if (!postId) {
      return next(ApiError.badRequest('Не задан post id'));
    }

    try {
      await dbPostController.deletePost({
        postId: Number(postId),
      });
      res.status(204).end();
    } catch (err) {
      return next(ApiError.badRequest('Не получилось удалить пост'));
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async getPosts(_req: Request, res: Response) {
    const posts = await dbPostController.getPosts();
    res.status(200).json(posts.map((post) => post.toJSON()));
  }
}

export default new PostsController();
