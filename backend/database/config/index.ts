import dotenv from 'dotenv';
import path from 'path';
import { SequelizeOptions } from 'sequelize-typescript';
import normalizePort from '../../../src/server/utils/normalizePort';

const PATH_TO_ENV = path.resolve('backend/.env');

dotenv.config({ path: PATH_TO_ENV });

const DIALECT = 'postgres'; // 'mysql', 'sqlite', 'mariadb', 'mssql'

const BASE_CONFIG: SequelizeOptions = {
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  host: process.env.DB_HOST,
  port: normalizePort(process.env.DB_PORT || '5432'),
  dialect: DIALECT,
};

export const getSequelizeConfig = (env: string): SequelizeOptions => {
  switch (env) {
    case 'test':
      return { ...BASE_CONFIG };
    case 'production':
      return { ...BASE_CONFIG };
    default:
      return { ...BASE_CONFIG };
  }
};
