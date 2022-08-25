export {};

declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Window {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __PRELOADED_STATE__?: object;
  }
}
