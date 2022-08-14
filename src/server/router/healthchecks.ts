import { Router } from 'express';
import { logger } from '@/server/middlewares';
import { ping } from '@/server/controllers';

export const healthRoutes = (router: Router) => {
  router.get('/ping', logger, ping);
};
