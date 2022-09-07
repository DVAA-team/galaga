import { Router } from 'express';
import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';

import { createDebug } from '@/server/utils';
import { env } from '@/server/config';

const debug = createDebug('route:YandexAPIProxy');

const router: Router = Router();

const yandexDomain = 'ya-praktikum.tech';

const createLogger = (level: string) => (message: string) => {
  if (message.includes('Rewriting path')) {
    return;
  }
  debug('%s %s', level, message);
};

router.use(
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
    logLevel: env.isDev() ? 'debug' : 'info',
    cookieDomainRewrite: '',
    onProxyReq: fixRequestBody,
  })
);

export default router;
