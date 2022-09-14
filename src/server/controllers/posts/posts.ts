import { Request, Response, NextFunction } from 'express';
import { dbPostController } from '@/database/controllers';
import { ApiError } from '@/server/error';

class PostsController {
  // eslint-disable-next-line consistent-return
  async getPost(req: Request, res: Response, next: NextFunction) {
    const { postId } = req.params;
    const { user } = res.locals;
    const { yandexId } = user;

    try {
      const post = await dbPostController.getPostById(
        Number(postId),
        Number(yandexId)
      );
      if (post) {
        res.status(200).json(post.toJSON());
      } else {
        return next(ApiError.badRequest(`Пост с id ${postId} не найден`));
      }
    } catch (err) {
      return next(ApiError.badRequest(`Пост с id ${postId} не найден`));
    }
  }

  // eslint-disable-next-line consistent-return
  async createPost(req: Request, res: Response, next: NextFunction) {
    const { title } = req.body;

    const { user } = res.locals;
    const userId = user.id;

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

  // eslint-disable-next-line consistent-return
  async updatePost(req: Request, res: Response, next: NextFunction) {
    const { title } = req.body;
    const { postId } = req.params;
    const { user } = res.locals;
    const { yandexId } = user;

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
        yandexId: Number(yandexId),
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

  // eslint-disable-next-line consistent-return
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

  async getPosts(_req: Request, res: Response) {
    const { user } = res.locals;
    const { yandexId } = user;
    const posts = await dbPostController.getPosts(yandexId);
    res.status(200).json(posts.map((post) => post.toJSON()));
  }
}

export default new PostsController();
