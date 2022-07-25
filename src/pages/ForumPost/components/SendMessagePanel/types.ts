import { FC } from 'react';

type TOwnProps = {
  handleClick?: () => (text: string) => void;
};

type TProps = FC<TOwnProps>;

export { TOwnProps, TProps };
