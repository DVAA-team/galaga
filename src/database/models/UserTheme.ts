/* eslint-disable no-use-before-define */
import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';
import User from '@/database/models/User';
import SiteTheme from '@/database/models/SiteTheme';

const modelName = 'UserTheme';
const tableName = 'UserThemes';

export default class UserTheme extends Model<
  InferAttributes<UserTheme>,
  InferCreationAttributes<UserTheme>
> {
  declare id: CreationOptional<number>;

  declare darkMode: boolean;

  declare themeId: ForeignKey<SiteTheme['id']>;

  declare ownerId: ForeignKey<User['id']>;

  static registration = (sequelize: Sequelize) => {
    UserTheme.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        darkMode: {
          type: DataTypes.BOOLEAN,
          defaultValue: true,
        },
      },
      {
        sequelize,
        modelName,
        tableName,
        timestamps: false,
      }
    );

    UserTheme.belongsTo(User, { foreignKey: 'ownerId' });
    UserTheme.belongsTo(SiteTheme, { foreignKey: 'themeId' });
  };
}
