import type { QueryInterface, Sequelize, Transaction } from 'sequelize';
import type { Debugger } from 'debug';
import type { MigrationFn } from 'umzug';

export function isDebugger(val: unknown): val is Debugger {
  return Object.prototype.hasOwnProperty.call(val, 'extend');
}
abstract class AbstractModel {
  declare static registration: (sequelize: Sequelize) => void;
}

export type TModels = typeof AbstractModel[];

type TInitializeDBOptions = {
  models: TModels;
};

export type TInitializationFn = ({
  models,
}: TInitializeDBOptions) => Promise<Sequelize | Error>;

export type TUmzugContext = {
  queryInterface: QueryInterface;
  transaction: Transaction;
  sequelize: Sequelize;
};

export type TUmzugMigrationFn = MigrationFn<TUmzugContext>;
