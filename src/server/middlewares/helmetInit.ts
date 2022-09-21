import helmet from 'helmet';

export default helmet({
  contentSecurityPolicy: {
    directives: {
      /* eslint-disable @typescript-eslint/naming-convention */
      'default-src': helmet.contentSecurityPolicy.dangerouslyDisableDefaultSrc,
      'script-src': ["'self'", "'unsafe-inline'"],
      /* eslint-disable @typescript-eslint/naming-convention */
    },
  },
});
