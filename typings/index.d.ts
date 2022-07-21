declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-explicit-any
  const content: any;
  export default content;
}
