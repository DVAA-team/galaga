import { DataType, Model, Table } from 'sequelize-typescript';
import { sequelize } from '../init';

export interface IUser {
  /* eslint-disable @typescript-eslint/naming-convention */
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  email: string;
  avatar: string;
  phone: string;
  /* eslint-enable @typescript-eslint/naming-convention */
}

const tableName = 'users';
const modelName = 'user';

@Table
class User extends Model<IUser> {
  /* eslint-disable @typescript-eslint/naming-convention */
  declare login: string;

  declare first_name: string;

  declare second_name: string;

  declare display_name: string | null;

  declare email: string;

  declare avatar: string;

  declare phone: string;
  /* eslint-enable @typescript-eslint/naming-convention */
}

sequelize.addModels([User]);

User.init(
  /* eslint-disable @typescript-eslint/naming-convention */
  {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    login: {
      type: DataType.CHAR,
    },
    first_name: {
      type: DataType.CHAR,
      defaultValue: '',
    },
    second_name: {
      type: DataType.CHAR,
      defaultValue: '',
    },
    display_name: {
      type: DataType.CHAR,
      defaultValue: '',
    },
    email: {
      type: DataType.CHAR,
      defaultValue: '',
    },
    avatar: {
      type: DataType.STRING,
      defaultValue: '',
    },
    phone: {
      type: DataType.CHAR,
      defaultValue: '',
    },
  },
  {
    sequelize,
    tableName,
    modelName,
    timestamps: false,
  }
  /* eslint-enable @typescript-eslint/naming-convention */
);

export default User;
