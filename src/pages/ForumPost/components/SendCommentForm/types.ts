import { FC } from 'react';
import { TForumComment } from '../../../../api/types';

type TOwnProps = {
  postId: number;
  messageId: number;
  addNewComment: (comment: TForumComment) => void;
};

type TProps = FC<TOwnProps>;

export { TOwnProps, TProps };
