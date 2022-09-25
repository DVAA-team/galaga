declare namespace Express {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Request {
    /** Logger instance associated with current request */
    logger: (message?: string) => void;
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface User {
    /* eslint-disable @typescript-eslint/naming-convention */
    id: number;
    login: string;
    firstName: string;
    secondName: string;
    displayName: string | null;
    email: string;
    avatar: string | null;
    phone: string;
    /* eslint-enable @typescript-eslint/naming-convention */
  }
}
