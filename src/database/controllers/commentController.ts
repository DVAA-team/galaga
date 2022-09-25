import { Comment, User } from '@/database/models';

const getCommentByMessageIdAndId = (
  messageId: number,
  id: number
): Promise<Comment | null> => {
  return Comment.findOne({
    where: { id, messageId },
    include: { model: User, as: 'user' },
  });
};

const createComment = ({
  text,
  userId,
  messageId,
}: {
  text: string;
  userId: number;
  messageId: number;
}): Promise<Comment | null> => {
  return Comment.create({ text, userId, messageId });
};

const updateComment = async ({
  text,
  commentId,
  messageId,
}: {
  text: string;
  messageId: number;
  commentId: number;
}): Promise<Comment | null> => {
  await Comment.update({ text }, { where: { id: commentId, messageId } });
  return getCommentByMessageIdAndId(messageId, messageId);
};

const deleteComment = async ({
  commentId,
  messageId,
}: {
  commentId: number;
  messageId: number;
}): Promise<number> => {
  return Comment.destroy({ where: { id: commentId, messageId } });
};

const getComments = ({
  messageId,
}: {
  messageId: number;
}): Promise<Comment[]> => {
  return Comment.findAll({
    where: { messageId },
    include: { model: User, as: 'user' },
  });
};

export default {
  getCommentByMessageIdAndId,
  createComment,
  updateComment,
  deleteComment,
  getComments,
};
