// FIXME: (denis) исправить ошибку линтера - ругается на 'cfg'
// eslint-disable-next-line import/no-unresolved
import { TAppConfig } from 'cfg';

const config: TAppConfig = {
  static: {
    baseUrl: '/static/',
    version: '',
  },
};

export { config };
