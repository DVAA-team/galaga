import helmet from 'helmet';

export default helmet({
  contentSecurityPolicy: {
    directives: {
      /* eslint-disable @typescript-eslint/naming-convention */
      'default-src': helmet.contentSecurityPolicy.dangerouslyDisableDefaultSrc,
      'script-src': [
        "'self'",
        "'unsafe-inline'",
        'https://mc.yandex.ru',
        'https://yastatic.net',
      ],
      'img-src': ["'self'", 'https: data:', 'data: blob:'],
      /* eslint-disable @typescript-eslint/naming-convention */
    },
  },
  crossOriginEmbedderPolicy: false,
});
