import { MigrationFn } from 'umzug';
import type { Sequelize } from 'sequelize';
import type { TUmzugContext } from '@/database/types';

type TWrapIntoTransactionFn = (
  sequelize: Sequelize,
  fn: MigrationFn<TUmzugContext>
) => MigrationFn<TUmzugContext>;

const wrapIntoTransaction: TWrapIntoTransactionFn =
  (sequelize, fn) => async (migrationParams) =>
    sequelize.transaction(async (transaction) => {
      const context: TUmzugContext = {
        queryInterface: sequelize.getQueryInterface(),
        transaction,
        sequelize,
      };
      return fn({ ...migrationParams, context });
    });

export default wrapIntoTransaction;
