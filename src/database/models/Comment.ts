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
import Message from '@/database/models/Message';

const modelName = 'Comment';
const tableName = 'Comments';

export default class Comment extends Model<
  InferAttributes<Comment>,
  InferCreationAttributes<Comment>
> {
  declare id: CreationOptional<number>;

  declare text: string;

  declare createdAt?: string;

  declare updatedAt?: string;

  declare userId: ForeignKey<User['id']>;

  declare messageId: ForeignKey<Message['id']>;

  static registration = (sequelize: Sequelize) => {
    Comment.init(
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

    Comment.belongsTo(User, { foreignKey: 'userId' });
    Comment.belongsTo(Message, { foreignKey: 'messageId' });
  };
}
