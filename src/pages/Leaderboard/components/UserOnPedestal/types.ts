import { FC } from 'react';
import { IUserData } from '../../types';

type TOwnProps = {
  userData?: IUserData;
  cls: string;
  position: number;
};

type TProps = FC<TOwnProps>;

export { TProps };
