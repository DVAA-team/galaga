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
    first_name: string;
    second_name: string;
    display_name: string | null;
    email: string;
    avatar: string | null;
    phone: string;
    /* eslint-enable @typescript-eslint/naming-convention */
  }
}
