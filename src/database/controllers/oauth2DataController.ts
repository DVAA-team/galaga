import UserOAuth2Data from '@/database/models/UserOAuth2Data';

type TOAuth2Data = {
  provider: string;
  providerUserId: string;
  accessToken: string;
  refreshToken: string;
  expiresIn: Date;
};

export const findOrCreate = async (data: TOAuth2Data) => {
  const { accessToken, expiresIn, provider, providerUserId, refreshToken } =
    data;

  let oauth2Data = await UserOAuth2Data.findOne({
    where: { provider, providerUserId },
  });
  if (!oauth2Data) {
    oauth2Data = await UserOAuth2Data.create({
      accessToken,
      expiresIn,
      provider,
      providerUserId,
      refreshToken,
    });
  }
  return oauth2Data.toJSON();
};

export const setUserIdTo = async (id: number, userId: number) => {
  const oauth2Data = await UserOAuth2Data.findByPk(id);
  if (!oauth2Data) {
    throw new Error(`Сессия с id:${id} не найдена`);
  }
  oauth2Data.userId = userId;
  await oauth2Data.save();
};
