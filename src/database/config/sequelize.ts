import { Options, Sequelize } from 'sequelize';
import { env } from '@/config';
import { isDebugger } from '@/database/types';
import fs from 'node:fs';

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, DB_HOST, DB_PORT } =
  process.env;

const dbUri =
  process.env.DATABASE_URL ??
  `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${DB_HOST}:${DB_PORT}/${POSTGRES_DB}`;

// postgres://<userName>:<userPassword>@<host>:<port>/<databaseName>

export const getInstance = (logger: (message: string) => void): Sequelize => {
  const logging = (sql: string, timing?: number) =>
    isDebugger(logger)
      ? logger.extend('sequelize')(`%s ${timing ? '~ %d ms' : ''}`, sql, timing)
      : logger(`${sql} ~ ${timing}ms`);

  const options: Options = {
    benchmark: env.isDev(),
    logging,
  };

  if (env.isProd()) {
    options.dialectOptions = {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Для устранения ошибки SequelizeConnectionError: self signed certificate
        ca: fs.readFileSync('/app/.postgresql/root.crt').toString(),
      },
    };
  }

  return new Sequelize(dbUri, options);
};
