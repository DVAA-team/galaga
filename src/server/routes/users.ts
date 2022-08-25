import { Router } from 'express';
import { userDetail } from '@/server/controllers';

const router: Router = Router();

router.get('/user/:userId', userDetail);

export default router;
