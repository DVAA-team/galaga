import { Router } from 'express';

import { AuthController } from '@/server/controllers';

const router: Router = Router();

router.route('/auth/yandex').get(AuthController.yandex.authenticate);
router
  .route('/auth/yandex/callback')
  .get(AuthController.yandex.authenticateAndRedirectTo('/'));

export default router;
