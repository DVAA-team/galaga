import { Router } from 'express';
import users from './users';
import posts from './posts';
import messages from './messages';
import comments from './comments';
import themes from './themes';
import leaderboard from './leaderboard';
import yandexOAuth2 from './auth/yandex';
import localLoginPasswordAuth from './auth/local';

const router: Router = Router();

router
  .use(localLoginPasswordAuth)
  .use(yandexOAuth2)
  .use(users)
  .use(posts)
  .use(messages)
  .use(comments)
  .use(themes)
  .use(leaderboard);

export default router;
