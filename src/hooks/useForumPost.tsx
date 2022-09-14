import { useEffect, useState } from 'react';

import { TPost } from '@/store/slices/forumSlice';
import { useAppSelector } from './store';

export const useForumPost = (postId: number) => {
  const forum = useAppSelector((state) => state.forum);
  const [post, setPost] = useState<TPost | null | undefined>(null);

  useEffect(() => {
    if (forum) {
      const { currentPost } = forum;

      if (currentPost !== null) {
        setPost(currentPost);
      } else if (forum.posts?.length) {
        const { posts } = forum;

        const founddPost = posts.find((p) => p.id === postId);
        setPost(founddPost);
      }
    }
  }, [forum, postId]);

  return post;
};
