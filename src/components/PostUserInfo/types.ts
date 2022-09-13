import { FC } from 'react';

type TOwnProps = {
  name: string;
  avatarURL?: string | null;
  date?: string;
};

type TProps = FC<TOwnProps>;

export { TOwnProps, TProps };
