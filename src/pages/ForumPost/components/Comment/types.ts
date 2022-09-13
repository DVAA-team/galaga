import { TForumComment } from '@/api/types';
import { TForumUser } from '@/services/types';
import { FC } from 'react';

type TOwnProps = {
  user: TForumUser;
  createdAt?: string | null;
  text?: string;
};

type TProps = FC<TForumComment>;

export { TOwnProps, TProps };
