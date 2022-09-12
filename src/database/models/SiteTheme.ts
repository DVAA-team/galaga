/* eslint-disable no-use-before-define */
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';

const modelName = 'SiteTheme';
const tableName = 'SiteThemes';

type TTheme = {
  colorVars: {
    primary: string;
    secondary: string;
    accent: string;
    error: string;
    warning: string;
    info: string;
    success: string;
  };
  bgClass: string;
};

export default class SiteTheme extends Model<
  InferAttributes<SiteTheme>,
  InferCreationAttributes<SiteTheme>
> {
  declare id: CreationOptional<number>;

  declare name: string;

  declare theme: TTheme;

  declare description: string;

  static registration = (sequelize: Sequelize) => {
    SiteTheme.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
        },
        theme: {
          type: DataTypes.JSONB,
        },
        description: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName,
        tableName,
        timestamps: false,
      }
    );
  };
}
