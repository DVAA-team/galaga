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

const modelName = 'Leader';
const tableName = 'Leaders';

export default class Leader extends Model<
  InferAttributes<Leader>,
  InferCreationAttributes<Leader>
> {
  declare id: CreationOptional<number>;

  declare score: number;

  declare userId: ForeignKey<User['id']>;

  static registration = (sequelize: Sequelize) => {
    Leader.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        score: {
          type: DataTypes.INTEGER,
        },
      },
      {
        sequelize,
        modelName,
        tableName,
        timestamps: true,
      }
    );

    Leader.belongsTo(User, { foreignKey: 'userId', as: 'user' });
  };
}
