import { FC } from 'react';
import { TForumUserResponse } from '../../../../api/types';

type TOwnProps = {
  id: number;
  userId: number;
  postId: number;
  messageId?: number | null;
  createdAt?: string | null;
  text?: string;
  messagesNumber?: number;
  user: TForumUserResponse;
};

type TProps = FC<TOwnProps>;

export { TOwnProps, TProps };
