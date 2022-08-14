import { Router } from 'express';
import { staticRoutes } from './static';
import { healthRoutes } from './healthchecks';
import { appRoutes } from './app';

const router: Router = Router();

staticRoutes(router);
healthRoutes(router);
appRoutes(router);

export default router;
