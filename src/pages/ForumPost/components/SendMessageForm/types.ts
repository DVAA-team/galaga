import { FC } from 'react';

type TOwnProps = {
  postId: number;
  messageId?: number | null;
};

type TProps = FC<TOwnProps>;

export { TOwnProps, TProps };
