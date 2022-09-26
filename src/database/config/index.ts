import { env } from '@/server/config';
import { createDebug } from '@/server/utils';

export const debug = createDebug('database');

// eslint-disable-next-line no-console
export const logger = env.isProd() ? console.log : debug;

export * as sequelize from './sequelize';
export { default as umzug } from './umzug';
