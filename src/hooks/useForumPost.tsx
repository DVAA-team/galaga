import { useEffect, useState } from 'react';

import { TRootState } from '@/store';
import { TPost } from '@/store/slices/forumSlice';
import { useAppSelector } from './store';

export const useForumPost = (postId: number) => {
  const { forum } = useAppSelector((state: TRootState) => state);
  const [post, setPost] = useState<TPost | undefined>(
    forum?.posts?.find((p) => p.id === postId)
  );

  useEffect(() => {
    if (forum) {
      const { currentPost } = forum;

      if (currentPost !== null) {
        setPost(currentPost);
      } else if (forum.posts?.length) {
        const { posts } = forum;

        const findedPost = posts.find((p) => p.id === postId);
        setPost(findedPost);
      }
    }
  }, [forum, postId]);

  return post;
};
