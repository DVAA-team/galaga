import csurf from 'csurf';
import { env } from '../config';

export default function csurfInit() {
  return csurf({
    cookie: {
      key: '_csrf-token',
      path: '/',
      httpOnly: true,
      secure: env.isProd(),
      maxAge: 3600,
    },
  });
}
