import type { QueryInterface, Sequelize, Transaction } from 'sequelize';
import type { Debugger } from 'debug';
import type { MigrationFn } from 'umzug';
import type { Store } from 'express-session';

export function isDebugger(val: unknown): val is Debugger {
  return Object.prototype.hasOwnProperty.call(val, 'extend');
}

export type TInitializationResult = {
  sequelizeInstance: Sequelize;
  sequelizeSessionStore: Store;
};

export type TInitializationFn = () => Promise<TInitializationResult | Error>;

export type TUmzugContext = {
  queryInterface: QueryInterface;
  transaction: Transaction;
  sequelize: Sequelize;
};

export type TUmzugMigrationFn = MigrationFn<TUmzugContext>;
