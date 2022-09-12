import { TUmzugMigrationFn } from '@/database/types';
import { DataTypes, ModelAttributeColumnOptions } from 'sequelize';

const tables = ['Posts', 'Messages', 'Comments'];
const columns: { name: string; options: ModelAttributeColumnOptions }[] = [
  { name: 'createdAt', options: { type: DataTypes.DATE } },
  {
    name: 'updatedAt',
    options: {
      type: DataTypes.DATE,
    },
  },
];

export const up: TUmzugMigrationFn = async ({
  context: { transaction, queryInterface },
}) => {
  const promises: Promise<void>[] = [];
  for await (const tableName of tables) {
    const tableDefinition = await queryInterface.describeTable(tableName);
    for (const column of columns) {
      if (!tableDefinition[column.name]) {
        promises.push(
          queryInterface.addColumn(tableName, column.name, column.options, {
            transaction,
          })
        );
      }
    }
  }
  return Promise.all(promises);
};

export const down: TUmzugMigrationFn = async ({
  context: { transaction, queryInterface },
}) => {
  const promises: Promise<void>[] = [];
  for (const tableName of tables) {
    for (const column of columns) {
      promises.push(
        queryInterface.removeColumn(tableName, column.name, {
          transaction,
        })
      );
    }
  }
  return Promise.all(promises);
};
