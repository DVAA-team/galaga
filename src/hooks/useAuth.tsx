import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { TRootState } from '../store';
import { TUser } from '../api/types';

export const useAuth = () => {
  const [userData, setUserData] = useState<TUser | null>(null);
  const { user } = useSelector((state: TRootState) => state);

  useEffect(() => {
    setUserData(user.data as TUser);
  }, [user]);

  return userData;
};
