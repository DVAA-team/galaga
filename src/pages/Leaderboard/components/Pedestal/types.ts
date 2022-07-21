import { FC } from 'react';
import { IUserData } from '../../types';

type TOwnProps = {
  first?: IUserData;
  second?: IUserData;
  third?: IUserData;
};

type TProps = FC<TOwnProps>;

export { TProps };
