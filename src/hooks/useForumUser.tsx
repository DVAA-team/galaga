import { useEffect, useState } from 'react';

import { TRootState } from '@/store';
import { TPostUserData } from '@/store/slices/forumSlice';
import { useAppSelector } from './store';

export const useForumUser = (postId: number) => {
  const { forum } = useAppSelector((state: TRootState) => state);
  const [userData, setUserData] = useState<TPostUserData | undefined>(
    forum?.posts?.find((post) => post.id === postId)?.userData
  );

  useEffect(() => {
    if (forum) {
      if (forum.posts?.length) {
        const { posts } = forum;

        const currentPost = posts.find((post) => post.id === postId);
        setUserData(currentPost?.userData);
      }
    }
  }, [forum, postId]);

  return userData;
};
