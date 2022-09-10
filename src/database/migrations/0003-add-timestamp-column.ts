import { TUmzugMigrationFn } from '@/database/types';
import { Post, Comment, Message } from '@/database/models';
import { DataTypes } from 'sequelize';

export const up: TUmzugMigrationFn = async ({
  context: { sequelize, transaction, queryInterface },
}) => {
  Post.registration(sequelize);
  Comment.registration(sequelize);
  Message.registration(sequelize);

  await Promise.all([
    queryInterface.addColumn(
      'Posts',
      'createdAt',
      {
        type: DataTypes.DATE,
      },
      { transaction }
    ),
    queryInterface.addColumn(
      'Posts',
      'updatedAt',
      {
        type: DataTypes.DATE,
      },
      { transaction }
    ),
    queryInterface.addColumn(
      'Messages',
      'createdAt',
      {
        type: DataTypes.DATE,
      },
      { transaction }
    ),
    queryInterface.addColumn(
      'Messages',
      'updatedAt',
      {
        type: DataTypes.DATE,
      },
      { transaction }
    ),
    queryInterface.addColumn(
      'Comments',
      'createdAt',
      {
        type: DataTypes.DATE,
      },
      { transaction }
    ),
    queryInterface.addColumn(
      'Comments',
      'updatedAt',
      {
        type: DataTypes.DATE,
      },
      { transaction }
    ),
  ]);
};

export const down: TUmzugMigrationFn = async ({
  context: { transaction, queryInterface },
}) => {
  await Promise.all([
    queryInterface.removeColumn('Posts', 'createdAt', { transaction }),
    queryInterface.removeColumn('Posts', 'updatedAt', { transaction }),
    queryInterface.removeColumn('Messages', 'createdAt', { transaction }),
    queryInterface.removeColumn('Messages', 'updatedAt', { transaction }),
    queryInterface.removeColumn('Comments', 'createdAt', { transaction }),
    queryInterface.removeColumn('Comments', 'updatedAt', { transaction }),
  ]);
};
