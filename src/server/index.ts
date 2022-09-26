import 'dotenv/config';

import { createApp } from '@/server/app';
import { port } from '@/server/config';
import { startServer } from '@/server/utils';

createApp().then((app) => {
  if (!app) {
    // eslint-disable-next-line no-console
    console.log('Ошибка инициализации базы данных');
    process.exit(2);
  }
  startServer(app, port);
});
