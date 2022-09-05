import { Post } from '@/database/models';

const getPostById = (id: number): Promise<Post | null> => {
  return Post.findOne({ where: { id } });
};

const createPost = ({
  title,
  userId,
}: {
  title: string;
  userId: number;
}): Promise<Post | null> => {
  return Post.create({ title, userId });
};

const updatePost = async ({
  title,
  postId,
}: {
  title: string;
  postId: number;
}): Promise<Post | null> => {
  await Post.update({ title }, { where: { id: postId } });
  return getPostById(postId);
};

const deletePost = async ({ postId }: { postId: number }): Promise<number> => {
  return Post.destroy({ where: { id: postId } });
};

const getPosts = (): Promise<Post[]> => {
  return Post.findAll();
};

export default {
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getPosts,
};
