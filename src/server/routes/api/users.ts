import { Router } from 'express';
import { userController } from '@/server/controllers';

const router: Router = Router();

router
  .route('/users/:userId')
  .get([
    /* TODO validators, request prepare fn, etc */ userController.userDetail,
  ]);

router.route('/users/profile').put(userController.editUser);
router.route('/users/avatar').put(userController.uploadAvatar);
router.route('/users/password').put(userController.changePassword);

export default router;
