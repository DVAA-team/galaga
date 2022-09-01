import { FC } from 'react';

type TOwnProps = {
  children?: React.ReactNode;
};

type TProps = FC<TOwnProps>;

const PageTitle: TProps = ({ children }) => {
  return (
    <h1 className="grow text-center text-3xl text-center font-bold">
      {children}
    </h1>
  );
};

export default PageTitle;
