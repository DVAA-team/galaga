import { Leader, User } from '@/database/models';

const getLeaderByUserId = (id: number): Promise<Leader | null> => {
  return Leader.findOne({
    include: { model: User, where: { id }, as: 'user' },
  });
};

const addLeader = ({
  userId,
  score,
}: {
  score: number;
  userId: number;
}): Promise<Leader | null> => {
  return Leader.create({ score, userId });
};

const updateLeader = async ({
  userId,
  score,
}: {
  userId: number;
  score: number;
}): Promise<Leader | null> => {
  let leader = await getLeaderByUserId(userId);
  if (!leader) {
    leader = await addLeader({ userId, score });
  } else if (leader.score < score) {
    await Leader.update({ score }, { where: { id: leader.id } });
  }
  return leader;
};

const getLeaders = (): Promise<Leader[]> => {
  return Leader.findAll({
    order: [['score', 'DESC']],
    include: [{ model: User, as: 'user' }],
  });
};

export default {
  getLeaderByUserId,
  addLeader,
  updateLeader,
  getLeaders,
};
