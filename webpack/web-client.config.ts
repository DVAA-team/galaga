import path from 'path';
import CopyPlugin from 'copy-webpack-plugin';
import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import { DIST_DIR, SRC_DIR } from './env';
import fileLoader from './loaders/file';
import cssLoader from './loaders/css';
import jsLoader from './loaders/js';
import commonConfig from './common.config';

const config: Configuration = merge(commonConfig, {
  name: 'web_client',
  target: 'web',
  entry: path.resolve(SRC_DIR, 'ssr-client'),
  output: {
    path: path.resolve(DIST_DIR, 'public'),
    publicPath: '/',
    filename: 'webClient.js',
    libraryTarget: 'var',
    library: 'WebClient',
  },
  module: {
    rules: [fileLoader.client, cssLoader.client, jsLoader.client],
  },

  plugins: [
    new CopyPlugin({
      patterns: ['public'],
    }),
  ],
});

export default config;
