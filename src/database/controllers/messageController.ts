import { Message } from '@/database/models';

const getMessageByPostIdAndId = (
  postId: number,
  id: number
): Promise<Message | null> => {
  return Message.findOne({ where: { id, postId } });
};

const createMessage = ({
  text,
  userId,
  postId,
  commentId,
}: {
  text: string;
  userId: number;
  postId: number;
  commentId?: number;
}): Promise<Message | null> => {
  return commentId
    ? Message.create({ text, userId, postId, commentId })
    : Message.create({ text, userId, postId });
};

const updateMessage = async ({
  text,
  messageId,
  postId,
}: {
  text: string;
  messageId: number;
  postId: number;
}): Promise<Message | null> => {
  await Message.update({ text }, { where: { id: messageId, postId } });
  return getMessageByPostIdAndId(postId, messageId);
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

const getMessages = ({ postId }: { postId: number }): Promise<Message[]> => {
  return Message.findAll({ where: { postId } });
};

export default {
  getMessageByPostIdAndId,
  createMessage,
  updateMessage,
  deleteMessage,
  getMessages,
};
