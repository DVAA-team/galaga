import { Request, Response, NextFunction } from 'express';
import { dbPostController } from '@/database/controllers';
import { ApiError } from '@/server/error';

class PostsController {
  // eslint-disable-next-line consistent-return
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

  async createPost(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      next(ApiError.forbidden('Необходимо авторизация'));
      return;
    }

    const { title } = req.body;

    const { user } = req;
    const userId = user.id;

    if (!title) {
      next(ApiError.badRequest('Не задан title'));
      return;
    }

    try {
      const post = await dbPostController.createPost({
        title,
        userId: Number(userId),
      });
      if (post) {
        res.status(201).json(post.toJSON());
      } else {
        next(ApiError.badRequest('Не получилось создать пост'));
      }
    } catch (err) {
      next(ApiError.badRequest('Не получилось создать пост'));
    }
  }

  async updatePost(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      next(ApiError.forbidden('Необходимо авторизация'));
      return;
    }

    const { title } = req.body;
    const { postId } = req.params;

    if (!title) {
      next(ApiError.badRequest('Не задан title'));
      return;
    }

    if (!postId) {
      next(ApiError.badRequest('Не задан post id'));
      return;
    }

    try {
      const post = await dbPostController.updatePost({
        title,
        postId: Number(postId),
      });
      if (post) {
        res.status(200).json(post.toJSON());
      } else {
        next(ApiError.badRequest('Не получилось обновить пост'));
      }
    } catch (err) {
      next(ApiError.badRequest('Не получилось обновить пост'));
    }
  }

  async deletePost(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      next(ApiError.forbidden('Необходимо авторизация'));
      return;
    }

    const { postId } = req.params;

    if (!postId) {
      next(ApiError.badRequest('Не задан post id'));
      return;
    }

    try {
      await dbPostController.deletePost({
        postId: Number(postId),
      });
      res.status(204).end();
    } catch (err) {
      next(ApiError.badRequest('Не получилось удалить пост'));
    }
  }

  async getPosts(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
      next(ApiError.forbidden('Необходимо авторизация'));
      return;
    }

    const posts = await dbPostController.getPosts();
    res.status(200).json(posts.map((post) => post.toJSON()));
  }
}

export default new PostsController();
