import path from 'path';
import fs from 'node:fs';
import { Configuration, WebpackPluginInstance, EntryObject } from 'webpack';
import nodeExternals from 'webpack-node-externals';
import { merge } from 'webpack-merge';
import dotenv from 'dotenv';
import { DIST_DIR, IS_DEV, SRC_DIR, MIGRATION_DIR } from './env';

import jsLoader from './loaders/js';
import commonConfig from './common.config';

import StartServerPlugin from './plugins/StartServerPlugin';

dotenv.config();

const migrations = fs
  .readdirSync(MIGRATION_DIR)
  .reduce<EntryObject>((acc, fileName) => {
    acc[path.basename(fileName, '.ts')] = {
      import: path.join(MIGRATION_DIR, fileName),
      library: {
        type: 'commonjs2',
      },
      filename: 'migrations/[name].js',
    };
    return acc;
  }, {});

const config: Configuration = merge(commonConfig, {
  name: 'server',
  target: 'node',
  dependencies: ['ssr_client'],
  entry: {
    server: {
      import: path.resolve(SRC_DIR, 'server'),
    },
    ...migrations,
  },
  output: {
    path: path.resolve(DIST_DIR, 'server'),
    filename: '[name].[fullhash].js',
    libraryTarget: 'commonjs2',
    clean: true,
  },
  externalsPresets: { node: true },
  externals: [nodeExternals()],
  resolve: {
    alias: {
      // Добавляем алиас для обращения к коду клиента внутри express сервера
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'builded-ssr-client': path.resolve(DIST_DIR, 'ssr-client'),
    },
  },

  module: {
    rules: [jsLoader.server],
  },
  plugins: [
    // Плагин для запуска сервера
    IS_DEV && new StartServerPlugin(),
  ].filter(Boolean) as WebpackPluginInstance[],
  // optimization: { nodeEnv: false },
});

export default config;
