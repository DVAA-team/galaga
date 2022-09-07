import { useEffect, useState } from 'react';
import { useAppSelector } from '@/hooks/store';

import { TUser } from '@/services/types';
import { TRootState } from '@/store';

export const useAuth = () => {
  const { user } = useAppSelector((state: TRootState) => state);
  const [userProfile, setUserProfile] = useState<TUser | null>(user.profile);

  useEffect(() => {
    if (user) {
      setUserProfile(user.profile);
    }
  }, [user]);

  return userProfile;
};
