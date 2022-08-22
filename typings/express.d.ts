declare namespace Express {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Request {
    /** Logger instance associated with current request */
    logger: (message?: string) => void;
  }
}
