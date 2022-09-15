import { Sequelize } from 'sequelize';
import { env } from '@/config';
import { isDebugger } from '@/database/types';

const dbUri =
  process.env.DATABASE_URL ??
  'postgres://postgres:example@localhost:5432/galaga';

// postgres://<userName>:<userPassword>@<host>:<port>/<databaseName>

export const getInstance = (logger: (message: string) => void): Sequelize => {
  const logging = (sql: string, timing?: number) =>
    isDebugger(logger)
      ? logger.extend('sequelize')(`%s ${timing ? '~ %d ms' : ''}`, sql, timing)
      : logger(`${sql} ~ ${timing}ms`);

  return new Sequelize(dbUri, {
    benchmark: env.isDev(),
    logging,
  });
};
