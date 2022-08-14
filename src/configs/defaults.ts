import { join } from 'path';
// FIXME: (denis) нужно пофиксить настройки линтера, чтобы не ругался
//  на импорт cfg
// eslint-disable-next-line import/no-unresolved
import { TAppConfig } from 'cfg';

const config: TAppConfig = {
  static: {
    dir: join(__dirname, '..', 'dist/static'),
    staticDir: join(__dirname, '..', 'dist'),
  },
};

export { config };
