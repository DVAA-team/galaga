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

const modelName = 'Post';
const tableName = 'Posts';

export default class Post extends Model<
  InferAttributes<Post>,
  InferCreationAttributes<Post>
> {
  declare id: CreationOptional<number>;

  declare title: string;

  declare createdAt?: string;

  declare updatedAt?: string;

  declare userId: ForeignKey<User['id']>;

  static registration = (sequelize: Sequelize) => {
    Post.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        title: {
          type: DataTypes.STRING,
        },
        createdAt: {
          type: 'TIMESTAMP',
        },
        updatedAt: {
          type: 'TIMESTAMP',
        },
      },
      {
        sequelize,
        modelName,
        tableName,
        timestamps: true,
      }
    );
  };

  static applyAssociations = () => {
    Post.belongsTo(User, { foreignKey: 'userId', as: 'user' });
  };
}
