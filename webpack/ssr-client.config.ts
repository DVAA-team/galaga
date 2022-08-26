import path from 'path';
import { Configuration, ProvidePlugin } from 'webpack';
import nodeExternals from 'webpack-node-externals';
import { merge } from 'webpack-merge';
import { DIST_DIR, SRC_DIR } from './env';
import fileLoader from './loaders/file';
import cssLoader from './loaders/css';
import jsLoader from './loaders/js';
import commonConfig from './common.config';

const config: Configuration = merge(commonConfig, {
  name: 'ssr_client',
  target: 'node',
  entry: path.resolve(SRC_DIR, 'ssr-client'),
  output: {
    path: path.resolve(DIST_DIR, 'ssr-client'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
    clean: true,
  },
  externalsPresets: { node: true },
  externals: [
    {
      // Подключаем серверные моки
      axios: path.resolve(__dirname, 'mocks/axios.js'),
    },
    nodeExternals({
      allowlist: [/^react-toastify/],
    }),
  ],

  module: {
    rules: [fileLoader.server, cssLoader.server, jsLoader.server],
  },

  plugins: [
    new ProvidePlugin({
      // Подключаем браузерные моки
      // eslint-disable-next-line @typescript-eslint/naming-convention
      AudioContext: path.resolve(__dirname, 'mocks/AudioContext.js'),
      createImageBitmap: path.resolve(__dirname, 'mocks/createImageBitmap.js'),
      window: path.resolve(__dirname, 'mocks/window.js'),
    }),
  ],
});

export default config;
