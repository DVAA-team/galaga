import path from 'node:path';
import type { Sequelize } from 'sequelize';
import { SequelizeStorage, Umzug, UmzugOptions } from 'umzug';

import { isDebugger, TUmzugContext } from '@/database/types';
import { wrapIntoTransaction } from '@/database/utils';
import { projectPaths } from '@/server/config';

const getConfig = (
  sequelize: Sequelize,
  logger: (message: string) => void
): UmzugOptions<TUmzugContext> => {
  const umzugLogger = (prefix: string, message: Record<string, unknown>) =>
    isDebugger(logger)
      ? logger.extend('umzug')('%s %O', prefix, message)
      : logger(`${prefix}${JSON.stringify(message)}`);
  return {
    migrations: {
      glob: path.join(projectPaths.dist, 'server/migrations/*.js'),
      resolve: (params) => {
        const { name } = params;
        const migration = Umzug.defaultResolver(params);

        return {
          name,
          up: wrapIntoTransaction(sequelize, migration.up),
          down: migration.down
            ? wrapIntoTransaction(sequelize, migration.down)
            : undefined,
        };
      },
    },
    storage: new SequelizeStorage({ sequelize }),
    logger: {
      info: (message) => umzugLogger('info', message),
      warn: (message) => umzugLogger('warn', message),
      error: (message) => umzugLogger('ERROR', message),
      debug: (message) => umzugLogger('debug', message),
    },
  };
};

export default {
  getConfig,
};
