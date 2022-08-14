import { Express } from 'express';

interface IOptions {
  app: Express;
}

const PORT = process.env.PORT || 3000;

export function startApp({ app }: IOptions) {
  app.listen(PORT, () => {
    // eslint-disable-next-line
    console.log(`App launched on port ${PORT}!`);
  });
}
