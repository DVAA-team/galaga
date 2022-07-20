declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  const content: {
    url?: string;
  };
  export default content;
}
