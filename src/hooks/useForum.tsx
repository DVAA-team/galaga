import { useEffect, useState } from 'react';

import { TRootState } from '@/store';
import { TPost } from '@/store/slices/forumSlice';
import { useAppSelector } from './store';

export const useForum = () => {
  const { forum } = useAppSelector((state: TRootState) => state);
  const [forumPosts, setForumPosts] = useState<TPost[] | null>(forum.posts);

  useEffect(() => {
    if (forum && forum.posts?.length) {
      setForumPosts(forum.posts);
    }
  }, [forum]);

  return forumPosts;
};
