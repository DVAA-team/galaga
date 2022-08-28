import type { Options } from 'sequelize';

import { env } from '@/config';
import { normalizePort } from '@/server/utils';
import { isDebugger } from '@/database/types';

const DIALECT = 'postgres';

const BASE_CONFIG: Options = {
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  host: process.env.DB_HOST,
  port: normalizePort(process.env.DB_PORT || '5432'),
  dialect: DIALECT,

  benchmark: env.isDev(),
};

const getConfig = (logger: (message: string) => void): Options => {
  const logging = (sql: string, timing?: number) =>
    isDebugger(logger)
      ? logger.extend('sequelize')(`%s ${timing ? '~ %d ms' : ''}`, sql, timing)
      : logger(`${sql} ~ ${timing}ms`);
  switch (env.contextName) {
    case 'test':
      return {
        ...BASE_CONFIG,
        database: `${BASE_CONFIG.database}_test`,
        logging,
      };
    case 'production':
      return { ...BASE_CONFIG, logging };
    default:
      return {
        ...BASE_CONFIG,
        database: `${BASE_CONFIG.database}_dev`,
        logging,
      };
  }
};

export default {
  getConfig,
};
