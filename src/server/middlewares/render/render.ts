import { NextFunction, Request, Response } from 'express';

import renderBundle from './bundle';

export default function render() {
  return (req: Request, res: Response, next: NextFunction) => {
    const location = req.url;
    const { html } = renderBundle({ location });
    res.send(html);
    next();
  };
}
