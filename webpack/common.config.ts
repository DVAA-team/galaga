import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { Compiler, Configuration } from 'webpack';
import { IS_DEV } from './env';

const commonConfig: Configuration = {
  devtool: 'source-map',
  resolve: {
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
    extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx', '.css'],
    modules: ['src', 'node_modules'],
  },
  plugins: [
    {
      apply(compiler: Compiler) {
        compiler.hooks.beforeRun.tap('statusPrint', () => {
          // eslint-disable-next-line no-console
          console.log(`Start compiling ${compiler.name} ....`);
        });
        compiler.hooks.watchRun.tap('statusPrint', () => {
          // eslint-disable-next-line no-console
          console.log(`Start compiling ${compiler.name} ....`);
        });
        compiler.hooks.done.tap('statusPrint', (stats) => {
          // eslint-disable-next-line no-console
          console.log(
            'End compiling',
            stats.toString({
              // all: false,
              assets: false,
              modules: false,
              entrypoints: false,
              logging: 'warn',
              colors: true,
            })
          );
        });
      },
    },
  ],
  stats: 'none',
  performance: {
    hints: IS_DEV ? false : 'warning',
  },
};

export default commonConfig;
