import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { Configuration, ProgressPlugin } from 'webpack';
import { IS_DEV } from './env';

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
  ],
  stats: 'minimal',
  performance: {
    hints: IS_DEV ? false : 'warning',
  },
};

export default commonConfig;
