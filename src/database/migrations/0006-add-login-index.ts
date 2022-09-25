import { TUmzugMigrationFn } from '@/database/types';

export const up: TUmzugMigrationFn = async ({
  context: { transaction, queryInterface },
}) => {
  await queryInterface.addIndex('Users', {
    name: 'login_index',
    unique: true,
    fields: ['login'],
    transaction,
  });
};

export const down: TUmzugMigrationFn = async ({
  context: { transaction, queryInterface },
}) => {
  await queryInterface.removeIndex('Users', 'login_index', { transaction });
};
