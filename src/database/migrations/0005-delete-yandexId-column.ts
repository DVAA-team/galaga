import { TUmzugMigrationFn } from '@/database/types';

export const up: TUmzugMigrationFn = async ({
  context: { transaction, queryInterface },
}) => {
  await queryInterface.removeColumn('Users', 'yandexId', { transaction });
};

export const down: TUmzugMigrationFn = async () => {
  // Невозможно откатить
};
