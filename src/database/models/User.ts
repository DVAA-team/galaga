/* eslint-disable no-use-before-define */
import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Sequelize,
  ModelStatic,
} from 'sequelize';
import { DataTypes, Model } from 'sequelize';

const modelName = 'User';
const tableName = 'Users';
export default class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  /* eslint-disable @typescript-eslint/naming-convention */
  declare id: CreationOptional<number>;

  declare login: string;

  declare first_name: string;

  declare second_name: string;

  declare display_name: string | null;

  declare email: string;

  declare avatar: CreationOptional<string>;

  declare phone: string;

  /* eslint-enable @typescript-eslint/naming-convention */
  static registration = (sequelize: Sequelize) => {
    User.init(
      /* eslint-disable @typescript-eslint/naming-convention */
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        login: {
          type: DataTypes.STRING,
        },
        first_name: {
          type: DataTypes.STRING,
          defaultValue: '',
        },
        second_name: {
          type: DataTypes.STRING,
          defaultValue: '',
        },
        display_name: {
          type: DataTypes.STRING,
          defaultValue: '',
        },
        email: {
          type: DataTypes.STRING,
          defaultValue: '',
        },
        avatar: {
          type: DataTypes.STRING,
          defaultValue: '',
        },
        phone: {
          type: DataTypes.STRING,
          defaultValue: '',
        },
      },
      {
        sequelize,
        modelName,
        tableName,
        timestamps: false,
      }
      /* eslint-enable @typescript-eslint/naming-convention */
    );
  };
}

export const isUserMode = (mode: ModelStatic<Model>): mode is typeof User => {
  return mode.tableName === User.tableName;
};
