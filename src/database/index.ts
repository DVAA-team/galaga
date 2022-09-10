import { Sequelize } from 'sequelize';
import { Umzug } from 'umzug';
import { env } from '@/server/config';
import { waitDB } from '@/database/utils';
import { logger, sequelize, umzug } from '@/database/config';
import { TInitializationFn } from './types';

const sequelizeInstance = new Sequelize(sequelize.getConfig(logger));
const migrationsManager = new Umzug(umzug.getConfig(sequelizeInstance, logger));

export const initializeDB: TInitializationFn = async ({ models }) => {
  for (const model of models) {
    model.registration(sequelizeInstance);
  }

  try {
    await waitDB(sequelizeInstance, 5, logger);
    // TODO: Не стал писать миграции, вначале надо прокатить базу с force, потом можно расскомментировать строку
    // await sequelizeInstance.sync();
    await sequelizeInstance.sync({ force: env.isDev() });

    await migrationsManager.up();
    return sequelizeInstance;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    logger('Initialization error');
    logger(error);
    return error;
  }
};
