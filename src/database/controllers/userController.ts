import { User } from '@/database/models';
import { TUserResponse } from '@/api/types';

const getUserById = (id: number): Promise<User | null> =>
  User.findOne({ where: { id } });

const getByYandexId = (yandexId: number): Promise<User | null> =>
  User.findOne({ where: { yandexId } });

const createUserFromYandexData = (data: TUserResponse): Promise<User> => {
  return User.create(data);
};

export default {
  getUserById,
  getByYandexId,
  createUserFromYandexData,
};
