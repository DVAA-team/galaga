import { Sequelize } from 'sequelize-typescript';
import { SequelizeStorage, Umzug } from 'umzug';
import { getSequelizeConfig } from '../config';

const env = process.env.NODE_ENV || 'development';

export const sequelize = new Sequelize(getSequelizeConfig(env));

export async function dbConnect() {
  try {
    await sequelize.authenticate();
  } catch (error) {
    throw new Error(`Unable to connect to the database: ${error}`);
  }
}

export const migrationsManager = new Umzug({
  migrations: {
    glob: ['../../backend/database/migrations/*.js', { cwd: __dirname }],
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});
