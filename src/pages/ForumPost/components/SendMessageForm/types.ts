import { TForumMessage } from '@/api/types';
import { FC } from 'react';

type TOwnProps = {
  postId: number;
  commentId?: number | null;
  sendCallback?: (r: TForumMessage) => void;
};

type TProps = FC<TOwnProps>;

export { TOwnProps, TProps };
