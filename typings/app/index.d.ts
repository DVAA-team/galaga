declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface Request {
      /** Logger instance associated with current request */
      logger: () => void;
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface Response {
      /**
       * Renders bundle to html, then sends it
       * or performs redirect if necessary
       */
      // tslint:disable-next-line:no-any
      renderBundle(bundleName: string, data?: any): void;
    }
  }
}
