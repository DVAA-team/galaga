import { Router } from 'express';
import { CommentsController } from '@/server/controllers';

const router: Router = Router();

router
  .route('/posts/:postId/messages/:messageId/comments/:commentId')
  .get(CommentsController.getComment)
  .put(CommentsController.updateComment)
  .delete(CommentsController.deleteComment);
router
  .route('/posts/:postId/messages/:messageId/comments')
  .post(CommentsController.createComment)
  .get(CommentsController.getComments);

export default router;
