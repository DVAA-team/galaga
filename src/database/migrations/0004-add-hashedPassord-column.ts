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
};

export const down: TUmzugMigrationFn = async ({
  context: { transaction, queryInterface },
}) => {
  await queryInterface.removeColumn('Users', 'hashedPassword', { transaction });
};
