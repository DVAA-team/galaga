import { RequestHandler } from 'express';

import { store } from '@/store';
import { setUserProfile } from '@/store/slices/userSlice';

export const initStoreWithUser: RequestHandler = (req, _res, next) => {
  let userDetails = null;

  if ('user' in req.cookies) {
    const { user } = req.cookies;

    userDetails = JSON.parse(decodeURIComponent(user));
  }

  store.dispatch(setUserProfile(userDetails));

  next();
};

export default initStoreWithUser;
