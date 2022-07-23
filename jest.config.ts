/* eslint-disable @typescript-eslint/naming-convention */
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '@hookform/resolvers/yup':
      '<rootDir>/node_modules/@hookform/resolvers/yup/dist/yup.js',
    '@hookform/resolvers':
      '<rootDir>/node_modules/@hookform/resolvers/dist/resolvers.js',
  },
};
export default config;
