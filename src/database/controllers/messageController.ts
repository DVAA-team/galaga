import { Message, User } from '@/database/models';

const getMessageByPostIdAndId = (
  postId: number,
  id: number,
  yandexId: number
): Promise<Message | null> => {
  return Message.findOne({
    where: { id, postId },
    include: { model: User, where: { yandexId }, as: 'user' },
  });
};

const createMessage = ({
  text,
  userId,
  postId,
}: {
  text: string;
  userId: number;
  postId: number;
}): Promise<Message | null> => {
  return Message.create({ text, userId, postId });
};

const updateMessage = async ({
  text,
  messageId,
  postId,
  yandexId,
}: {
  text: string;
  messageId: number;
  postId: number;
  yandexId: number;
}): Promise<Message | null> => {
  await Message.update(
    { text },
    {
      where: { id: messageId, postId },
    }
  );
  return getMessageByPostIdAndId(postId, messageId, yandexId);
};

const deleteMessage = async ({
  messageId,
  postId,
}: {
  messageId: number;
  postId: number;
}): Promise<number> => {
  return Message.destroy({ where: { id: messageId, postId } });
};

const getMessages = ({
  postId,
  yandexId,
}: {
  postId: number;
  yandexId: number;
}): Promise<Message[]> => {
  return Message.findAll({
    where: { postId },
    include: { model: User, where: { yandexId }, as: 'user' },
  });
};

export default {
  getMessageByPostIdAndId,
  createMessage,
  updateMessage,
  deleteMessage,
  getMessages,
};
