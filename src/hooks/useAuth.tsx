import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { TRootState } from '../store';
import { TUser } from '../api/types';

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
