import { Router } from 'express';
import { MessagesController } from '@/server/controllers';

const router: Router = Router();

router
  .route('/posts/:postId/messages/:messageId')
  .get(MessagesController.getMessage)
  .put(MessagesController.updateMessage)
  .delete(MessagesController.deleteMessage);
router
  .route('/posts/:postId/messages')
  .post(MessagesController.createMessage)
  .get(MessagesController.getMessages);

export default router;
