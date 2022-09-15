import { TForumMessage, TForumPost } from '@/api/types';
import { FC } from 'react';

type TOwnProps = TForumPost & {
  messages?: TForumMessage[];
};

type TProps = FC<TOwnProps>;

export { TOwnProps, TProps };
