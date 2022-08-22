import { TLoadersSet } from '../types/loader';

const testRegex = /\.(?:ico|gif|png|jpg|jpeg|svg|mp3)$/i;

const fileLoaders: TLoadersSet = {
  client: {
    test: testRegex,
    type: 'asset/resource',
  },
  server: {
    test: testRegex,
    type: 'asset/resource',
    generator: {
      publicPath: '/',
      emit: false,
    },
  },
};

export default fileLoaders;
