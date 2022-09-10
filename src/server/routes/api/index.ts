import { Router, RequestHandler } from 'express';

import { initializeDB } from '@/database';
import {
  User,
  Post,
  Message,
  UserTheme,
  SiteTheme,
  Comment,
} from '@/database/models';

import checkUser from '@/server/middlewares/checkUser';
import users from './users';
import posts from './posts';
import messages from './messages';
import comments from './comments';
import themes from './themes';

const router: Router = Router();

const dbInstancePromise = initializeDB({
  models: [User, Post, Message, SiteTheme, UserTheme, Comment],
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

router
  .use([checkUser], checkDBConnection)
  .use(users)
  .use(posts)
  .use(messages)
  .use(comments)
  .use(themes);

export default router;
