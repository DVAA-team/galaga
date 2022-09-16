import type { Sequelize } from 'sequelize';
import { createDebug } from '@/server/utils';

const pause = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const defaultLogger: (message: string) => void = createDebug('sequelize');

const waitDB = async (
  sequelize: Sequelize,
  trying = 5,
  logger = defaultLogger
): Promise<Error | null> => {
  logger(
    `waiting connection [postgres://${sequelize.config.username}@${sequelize.config.host}:${sequelize.config.port}/${sequelize.config.database}] ....`
  );
  try {
    await sequelize.authenticate();
    logger('connection success');
    return null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (trying > 1) {
      // trying -= 1;
      await pause(5000);
      return waitDB(sequelize, trying - 1, logger);
    }
    throw error;
  }
};

export default waitDB;
