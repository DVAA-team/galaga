import { Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import createDebug from '@/server/utils/debug';

const debug = createDebug.extend('route:YandexAPIProxy');

const router: Router = Router();

const yandexDomain = 'ya-praktikum.tech';

const createLogger = (level: string) => (message: string) => {
  if (message.includes('Rewriting path')) {
    return;
  }
  debug('%s %s', level, message);
};

router.use(
  '/yandex-api',
  createProxyMiddleware({
    target: `https://${yandexDomain}/api/v2`,
    changeOrigin: true,
    pathRewrite: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      '^/yandex-api': '',
    },
    logProvider: () => ({
      log: createLogger('log'),
      debug: createLogger('debug'),
      info: createLogger('info'),
      warn: createLogger('warn'),
      error: createLogger('error'),
    }),
    logLevel: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
    cookieDomainRewrite: 'localhost', // FIXME Потенциальная проблема при деплое
  })
);

export default router;
