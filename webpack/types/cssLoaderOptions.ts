type TCssLoaderOptions = {
  importLoaders: number;
  url?: { filter: (url: string, resourcePath: string) => boolean };
  modules?: {
    localIdentName: string;
    hashStrategy: string;
  };
};

export default TCssLoaderOptions;
