import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { Configuration, DefinePlugin, ProgressPlugin } from 'webpack';
import dotenv from 'dotenv';
import { IS_DEV } from './env';

dotenv.config();

const commonConfig: Configuration = {
  devtool: 'source-map',
  resolve: {
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
    extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx', '.css'],
    modules: ['src', 'node_modules'],
  },
  plugins: [
    new ProgressPlugin({
      activeModules: false,
      entries: true,
      modules: true,
      modulesCount: 5000,
      profile: false,
      dependencies: true,
      dependenciesCount: 10000,
      percentBy: null,
    }),
    new DefinePlugin({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'process.env': JSON.stringify(process.env),
    }),
  ],
  stats: 'minimal',
  performance: {
    hints: IS_DEV ? false : 'warning',
  },
};

export default commonConfig;
