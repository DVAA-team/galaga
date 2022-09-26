/* eslint-disable no-use-before-define */
import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  ModelStatic,
  Sequelize,
} from 'sequelize';
import User from '@/database/models/User';

const modelName = 'UserOAuthData';
const tableName = 'UserOAuthDatas';

export default class UserOAuth2Data extends Model<
  InferAttributes<UserOAuth2Data>,
  InferCreationAttributes<UserOAuth2Data>
> {
  declare id: CreationOptional<number>;

  declare provider: string;

  declare providerUserId: string;

  declare accessToken: string;

  declare refreshToken: string;

  declare expiresIn: Date;

  declare userId: ForeignKey<User['id']>;

  static registration = (sequelize: Sequelize) => {
    UserOAuth2Data.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        providerUserId: {
          type: DataTypes.STRING,
        },
        provider: {
          type: DataTypes.STRING,
        },
        accessToken: {
          type: DataTypes.STRING,
        },
        refreshToken: {
          type: DataTypes.STRING,
        },
        expiresIn: {
          type: DataTypes.DATE,
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

  static applyAssociations = () => {
    UserOAuth2Data.belongsTo(User, { foreignKey: 'userId' });
  };
}

export const isUserOAuth2DataModel = (
  model: ModelStatic<Model>
): model is typeof UserOAuth2Data => {
  return model.tableName === UserOAuth2Data.tableName;
};
