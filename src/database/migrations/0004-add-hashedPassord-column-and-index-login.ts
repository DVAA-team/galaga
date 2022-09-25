import { TUmzugMigrationFn } from '@/database/types';
import { DataTypes } from 'sequelize';

export const up: TUmzugMigrationFn = async ({
  context: { transaction, queryInterface },
}) => {
  await queryInterface.addColumn(
    'Users',
    'hashedPassword',
    {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    { transaction }
  );
  await queryInterface.addIndex('Users', {
    unique: true,
    fields: ['login'],
    transaction,
  });
};

export const down: TUmzugMigrationFn = async ({
  context: { transaction, queryInterface },
}) => {
  queryInterface.removeColumn('Users', 'hashedPassword', { transaction });
};
