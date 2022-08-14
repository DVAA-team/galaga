declare module 'cfg' {
  interface IConfig {
    /**
     * Option for environment detection
     */
    environment: string;

    /** Static content (built css and js, images, etc.) options */
    static: {
      /** Base url for static content (e.g. https://yastatic.net/s3/project-stub/) */
      baseUrl: string;

      /** Directory for the built static content */
      dir: string;

      /** Path to frozen (version agnostic) static content (e.g. "_") */
      frozenPath: string;

      /** Directory for static files, which should be served from / */
      staticDir: string;

      /** Path to version static content (usually picked from env) */
      version: string;
    };
  }

  type TRecursivePartial<T> = {
    [P in keyof T]?: TRecursivePartial<T[P]>;
  };

  export type TAppConfig = TRecursivePartial<IConfig>;

  const config: IConfig;
  export default config;
}
