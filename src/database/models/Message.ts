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
import Post from '@/database/models/Post';

const modelName = 'Message';
const tableName = 'Messages';

export default class Message extends Model<
  InferAttributes<Message>,
  InferCreationAttributes<Message>
> {
  declare id: CreationOptional<number>;

  declare text: string;

  declare createdAt?: string;

  declare updatedAt?: string;

  declare userId: ForeignKey<User['id']>;

  declare postId: ForeignKey<Post['id']>;

  static registration = (sequelize: Sequelize) => {
    Message.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        text: {
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
    Message.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    Message.belongsTo(Post, { foreignKey: 'postId' });
  };
}
