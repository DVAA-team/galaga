import {
  dbUserController,
  dbUserOAuth2DataController,
} from '@/database/controllers';
import { serverToClientNaming } from '@/utils/convertNaming';
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
    .then(async (dbUser) => {
      if (dbUser) {
        const isOAuth2User = await dbUserOAuth2DataController.isOAuth2User(
          dbUser.id
        );
        done(null, { ...serverToClientNaming(dbUser), isOAuth2User });
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
