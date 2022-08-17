import { Router } from 'express';
import { render } from '@/server/middlewares';

export const appRoutes = (router: Router) => {
  router.get('/*', render);
};
