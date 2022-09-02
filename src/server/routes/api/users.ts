import { Router } from 'express';
import { userController } from '@/server/controllers';

const router: Router = Router();

router
  .route('/users/:userId')
  .get([
    /* TODO validators, request prepare fn, etc */ userController.userDetail,
  ]);

export default router;
