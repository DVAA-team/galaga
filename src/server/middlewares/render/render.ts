import { RequestHandler } from 'express';

import renderBundle from './renderBundle';

const renderMiddleware: RequestHandler = (req, res) => {
  const html = renderBundle({ location: req.url });
  res.status(200).send(html);
};

export default renderMiddleware;
