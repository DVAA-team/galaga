import { Router } from 'express';
import { ping } from '@/server/controllers';

const router: Router = Router();

router.get('/ping', ping);

export default router;
