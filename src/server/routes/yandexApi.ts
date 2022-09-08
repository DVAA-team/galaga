import { Request, Router } from 'express';
import {
  createProxyMiddleware,
  fixRequestBody,
  responseInterceptor,
} from 'http-proxy-middleware';

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
    selfHandleResponse: true,
    onProxyRes: responseInterceptor(async (buffer, proxyRes, req, _res) => {
      const { method, url, cookies, body } = req as unknown as Request;
      const reqDesc = `${method} ${url}`;
      let response;
      if (proxyRes.headers['content-type']?.includes('application/json')) {
        response = JSON.parse(buffer.toString());
      } else {
        response = buffer.toString();
      }
      debug(
        `send %s\nsend cookies: %O\nsend body: %O\nresponse: %O`,
        reqDesc,
        cookies,
        body,
        response
      );

      return buffer;
    }),
  })
);

export default router;
