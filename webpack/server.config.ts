import path from 'path';
import { Configuration, WebpackPluginInstance } from 'webpack';
import nodeExternals from 'webpack-node-externals';
import { merge } from 'webpack-merge';
import { DIST_DIR, IS_DEV, SRC_DIR } from './env';

import jsLoader from './loaders/js';
import commonConfig from './common.config';

import OnFirstBuildDonePlugin from './plugins/OnFirstBuildDonePlugin';

const config: Configuration = merge(commonConfig, {
  name: 'server',
  target: 'node',
  dependencies: ['ssr_client'],
  entry: path.resolve(SRC_DIR, 'server'),
  output: {
    path: path.resolve(DIST_DIR, 'server'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
  externalsPresets: { node: true },
  externals: [nodeExternals()],
  resolve: {
    alias: {
      // Добавляем алиас для обращения к коду клиента внутри express сервера
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'builded-ssr-client': path.resolve(DIST_DIR, 'server/ssrClient'),
    },
  },

  module: {
    rules: [jsLoader.server],
  },
  plugins: [
    // Плагин для запуска команды в консоли после удачной первой сборки
    IS_DEV && new OnFirstBuildDonePlugin({ command: 'npm run dev:server' }),
  ].filter(Boolean) as WebpackPluginInstance[],
  optimization: { nodeEnv: false },
});

export default config;
