import { Router } from 'express';
import { healthChecksController } from '@/server/controllers';

const router: Router = Router();

router.get('/ping', healthChecksController.ping);

export default router;
