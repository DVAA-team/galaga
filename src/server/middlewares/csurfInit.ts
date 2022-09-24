import csurf from 'csurf';
import { env } from '../config';

export default csurf({
  cookie: {
    key: '_csrf-token',
    path: '/',
    httpOnly: true,
    secure: env.isProd(),
    maxAge: 3600,
  },
});
