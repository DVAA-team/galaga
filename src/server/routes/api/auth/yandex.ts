import { Router } from 'express';

import { AuthController } from '@/server/controllers';

const router: Router = Router();

router.route('/auth/yandex').get(AuthController.yandexOAuth2.authenticate);
router
  .route('/auth/yandex/callback')
  .get(AuthController.yandexOAuth2.authenticateAndRedirectTo('/'));

export default router;
