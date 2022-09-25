import { dbUserController } from '@/database/controllers';
import session from 'express-session';
import passport from 'passport';

type TSessionUser = {
  id: number;
};

type TCreateSessionMiddlewareOptions = {
  store: session.Store;
};

passport.serializeUser<TSessionUser>(({ id }, done) => {
  process.nextTick(() => {
    return done(null, {
      id,
    });
  });
});

passport.deserializeUser<TSessionUser>(({ id }, done) => {
  dbUserController
    .getUserById(id)
    .then((dbUser) => {
      if (dbUser) {
        done(null, dbUser);
      } else {
        done(null);
      }
    })
    .catch((error) => done(error));
});

export const createSessionMiddlewares = ({
  store,
}: TCreateSessionMiddlewareOptions) => [
  session({
    name: 'auth',
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store,
  }),
  passport.session(),
];
