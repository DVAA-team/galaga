import { useEffect, useState } from 'react';
import { useAppSelector } from '@/hooks/store';

import { TUser } from '@/services/types';

export const useAuth = () => {
  const profile = useAppSelector((state) => state.user.profile);
  const [userProfile, setUserProfile] = useState<TUser | null>(profile);

  useEffect(() => {
    if (profile) {
      setUserProfile(profile);
    }
  }, [profile]);

  return userProfile;
};
