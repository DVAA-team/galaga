import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { TUser } from '@/services/types';
import { TRootState } from '@/store';

export const useAuth = () => {
  const { user } = useSelector((state: TRootState) => state);
  const [userProfile, setUserProfile] = useState<TUser | null>(user.profile);

  useEffect(() => {
    if (user) {
      setUserProfile(user.profile);
    }
  }, [user]);

  return userProfile;
};
