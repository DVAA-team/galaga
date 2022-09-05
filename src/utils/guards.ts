import { TUser } from '@/services/types';

export const isUserAuthorized = (userData: TUser | null) => !!userData;
