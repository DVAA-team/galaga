const { Sequelize } = require('sequelize');

const tableName = 'users';

/* eslint-disable @typescript-eslint/naming-convention */
async function up({ context: queryInterface }) {
  await queryInterface.createTable(tableName, {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    login: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: '',
    },
    first_name: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: '',
    },
    second_name: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: '',
    },
    display_name: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: '',
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: '',
    },
    avatar: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: '',
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: '',
    },
  });
}

async function down({ context: queryInterface }) {
  await queryInterface.dropTable(tableName);
}

/* eslint-enable @typescript-eslint/naming-convention */

module.exports = { up, down };
