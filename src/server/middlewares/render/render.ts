import type { TRootState } from '@/store';
import { RequestHandler } from 'express';

import renderBundle from './renderBundle';

const renderMiddleware: RequestHandler = (req, res) => {
  const initialState: TRootState = {
    user: { profile: res.locals.user },
  };
  const html = renderBundle({
    location: req.url,
    initialState,
  });
  res.status(200).send(html);
};

export default renderMiddleware;
