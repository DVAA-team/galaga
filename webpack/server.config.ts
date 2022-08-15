import path from 'path';
import { Configuration } from 'webpack';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';

import { DIST_DIR, IS_DEV, SRC_DIR } from './env';
import fileLoader from './loaders/file';
import cssLoader from './loaders/css';
import svgLoader from './loaders/svg';
import jsLoader from './loaders/js';

const nodeExternals = require('webpack-node-externals');

const config: Configuration = {
  name: 'server',
  target: 'node',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  node: { __dirname: false },
  entry: path.join(SRC_DIR, 'server'),
  module: {
    rules: [
      fileLoader.server,
      cssLoader.server,
      jsLoader.server,
      cssLoader.server,
      svgLoader.server,
    ],
  },
  externalsPresets: { node: true },
  externals: [nodeExternals()],
  output: {
    filename: 'server.js',
    libraryTarget: 'commonjs2',
    path: DIST_DIR,
    publicPath: '/static/',
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
    extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx', '.css'],
    modules: ['src', 'node_modules'],
  },

  devtool: 'source-map',

  performance: {
    hints: IS_DEV ? false : 'warning',
  },

  optimization: { nodeEnv: false },
};

export default config;
