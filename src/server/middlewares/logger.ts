import { NextFunction, Request, Response } from 'express';

export default function logger() {
  return (req: Request, _res: Response, next: NextFunction) => {
    // FIXME: (denis) нужно объявить свойство logger у Request,
    //  но я не знаю как :(. Добавил interface Request в typings/app/index.d.ts,
    //  но это не помогает
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    req.logger = () => {
      // eslint-disable-next-line
      console.log(req);
    };
    next();
  };
}
