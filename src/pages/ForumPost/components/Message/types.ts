import { FC } from 'react';

type TOwnProps = {
  userDisplayName: string;
  userAvatarURL?: string;
  date?: string;
  text?: string;
  commentsNumber?: number;
  isMine?: boolean;
};

type TProps = FC<TOwnProps>;

export { TOwnProps, TProps };
