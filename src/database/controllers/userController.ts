import { User } from '@/database/models';

const getUserById = (id: number): Promise<User | null> =>
  User.findOne({ where: { id } });

export default {
  getUserById,
};
