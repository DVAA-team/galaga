import { RuleSetRule } from 'webpack';
import { TLoadersSet } from '../types/loader';

const testRegex = /\.tsx?$/;

const commonLoader: RuleSetRule = {
  test: testRegex,
  exclude: /node_modules/,
  use: { loader: 'babel-loader' },
};

const jsLoader: TLoadersSet = {
  client: commonLoader,
  server: commonLoader,
};

export default jsLoader;
