import { Umzug } from 'umzug';
import createSequelizeStore from 'connect-session-sequelize';
import session from 'express-session';

import { waitDB } from '@/database/utils';
import { logger, sequelize, umzug } from '@/database/config';
import * as models from '@/database/models';
import { TInitializationFn } from './types';

const SequelizeStore = createSequelizeStore(session.Store);

const sequelizeInstance = sequelize.getInstance(logger);
const migrationsManager = new Umzug(umzug.getConfig(sequelizeInstance, logger));
const sequelizeSessionStore = new SequelizeStore({ db: sequelizeInstance });

export const initializeDB: TInitializationFn = async () => {
  for (const { registration } of Object.values(models)) {
    registration(sequelizeInstance);
  }
  for (const { applyAssociations } of Object.values(models)) {
    applyAssociations();
  }

  try {
    await waitDB(sequelizeInstance, 5, logger);
    await sequelizeInstance.sync();

    await migrationsManager.up();
    return { sequelizeInstance, sequelizeSessionStore };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    logger('Initialization error');
    logger(error);
    return error;
  }
};
