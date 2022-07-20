/* eslint-disable @typescript-eslint/naming-convention */
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx|mjs)$': 'babel-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  extensionsToTreatAsEsm: ['.jsx', '.tsx', '.ts'],
  moduleNameMapper: {
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '@hookform/resolvers/yup':
      '<rootDir>/node_modules/@hookform/resolvers/yup/dist/yup.js',
    '@hookform/resolvers':
      '<rootDir>/node_modules/@hookform/resolvers/dist/resolvers.js',
  },
};
export default config;
