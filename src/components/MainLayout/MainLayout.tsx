import { FC } from 'react';

type TOwnProps = {
  children?: React.ReactNode;
};

type TProps = FC<TOwnProps>;

const MainLayout: TProps = (props) => {
  const { children } = props;

  return (
    <main className="container mx-auto flex flex-row justify-center content-center items-center flex-wrap grow">
      {children}
    </main>
  );
};

export default MainLayout;
