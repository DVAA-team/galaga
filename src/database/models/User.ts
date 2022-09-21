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

  declare avatar: CreationOptional<string | null>;

  declare phone: string;

  declare yandexId: CreationOptional<number>;

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
          allowNull: true,
        },
        phone: {
          type: DataTypes.STRING,
          defaultValue: '',
        },
        yandexId: {
          type: DataTypes.INTEGER,
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

  static applyAssociations = () => {
    // Добавить связи при необходимости
  };
}

export const isUserModel = (
  model: ModelStatic<Model>
): model is typeof User => {
  return model.tableName === User.tableName;
};
