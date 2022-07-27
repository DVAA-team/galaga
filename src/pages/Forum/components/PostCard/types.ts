import { FC } from 'react';

type TOwnProps = {
  title: string;
  userDisplayName: string;
  userAvatarURL?: string;
  date: string;
  messagesNumber: number;
  membersNumber: number;
};

type TProps = FC<TOwnProps>;

export { TOwnProps, TProps };
