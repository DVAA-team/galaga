import { AuthController } from '@/server/controllers';
import { Router } from 'express';

const router: Router = Router();

router.route('/auth/signin').post(AuthController.local.signin);
router.route('/auth/signup').post(AuthController.local.signup);
router.route('/auth/logout').post(AuthController.local.logout);

export default router;
