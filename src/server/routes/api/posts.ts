import { Router } from 'express';
import { PostsController } from '@/server/controllers/posts';

const router: Router = Router();

router
  .route('/posts/:postId')
  .get(PostsController.getPost)
  .put(PostsController.updatePost)
  .delete(PostsController.deletePost);
router
  .route('/posts')
  .post(PostsController.createPost)
  .get(PostsController.getPosts);

export default router;
