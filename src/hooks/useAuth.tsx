import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { TUser } from '@/services/types';
import { TRootState } from '@/store';

export const useAuth = () => {
  const [userProfile, setUserProfile] = useState<TUser | null>(null);
  const { user } = useSelector((state: TRootState) => state);

  useEffect(() => {
    if (user) {
      setUserProfile(user.profile);
    }
  }, [user]);

  return userProfile;
};
