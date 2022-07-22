import { FC, ImgHTMLAttributes } from 'react';

type TOwnProps = {
  type?: 'circle' | 'square';
  borderType?: 'gold' | 'blue' | 'green';
  badge?: string;
  size?: 'xs' | 'sm' | 'lg' | 'xl' | 'xxl';
} & ImgHTMLAttributes<HTMLImageElement>;

type TProps = FC<TOwnProps>;

export { TProps };
