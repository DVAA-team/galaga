import { Router, RequestHandler } from 'express';

import { initializeDB } from '@/database';
import { User } from '@/database/models';

import users from './users';

const router: Router = Router();

const dbInstancePromise = initializeDB({
  models: [User],
});

const checkDBConnection: RequestHandler = async (_req, _res, next) => {
  let error: Error | undefined;
  try {
    const dbInstance = await dbInstancePromise;

    if (dbInstance instanceof Error) {
      throw dbInstance;
    }
    await dbInstance.authenticate();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    error = err;
  } finally {
    next(error);
  }
};

router.use(checkDBConnection).use(users);

export default router;
