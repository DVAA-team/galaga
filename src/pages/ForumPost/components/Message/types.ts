import { FC } from 'react';

type TOwnProps = {
  id: number;
  userId: number;
  postId: number;
  commentId?: number | null;
  date?: string;
  text?: string;
  commentsNumber?: number;
  isMine?: boolean;
};

type TProps = FC<TOwnProps>;

export { TOwnProps, TProps };
