import { FC } from 'react';

type TOwnProps = {
  emitSubmit: (text: string) => void;
};

type TProps = FC<TOwnProps>;

export { TOwnProps, TProps };
