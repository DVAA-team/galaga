import { TForumPost } from '@/api/types';
import { FC } from 'react';

type TOwnProps = {
  addNewPost: (r: TForumPost) => void;
};

type TProps = FC<TOwnProps>;

export { TOwnProps, TProps };
