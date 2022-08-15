import path from 'path';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import dotenv from 'dotenv';
import { DIST_DIR, SRC_DIR, PUBLIC_DIR } from './env';
import fileLoader from './loaders/file';
import cssLoader from './loaders/css';
import cssModuleLoader from './loaders/css-module';
import svgLoader from './loaders/svg';
import jsLoader from './loaders/js';

const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

dotenv.config();

const config = {
  name: 'client',

  target: 'web',

  entry: [
    // IS_DEV && 'react-hot-loader/patch',
    // Entry для работы HMR
    // IS_DEV && 'webpack-hot-middlewares/client',
    // IS_DEV && 'css-hot-loader/hotModuleReplacement',
    path.join(SRC_DIR, 'ssr-client'),
  ].filter(Boolean),

  output: {
    path: DIST_DIR,
    filename: 'ssr-client.js',
    // clean: true,
    publicPath: '/',
  },

  devServer: {
    static: {
      directory: PUBLIC_DIR,
    },
    port: process.env.PORT || 3000,
    historyApiFallback: true,
  },

  devtool: 'source-map',

  resolve: {
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
    extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx', '.css'],
  },

  module: {
    rules: [
      fileLoader.client,
      cssLoader.client,
      cssModuleLoader.client,
      svgLoader.client,
      jsLoader.client,
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: 'body',
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: './public/serviceWorker.js' }],
    }),
    new SpriteLoaderPlugin(),
  ],
};

export default config;
