import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

type TOwnProps = {
  isAllowed: boolean;
  redirectPath: string;
  children?: JSX.Element;
};

type TProps = FC<TOwnProps>;

const ProtectedRoute: TProps = (props) => {
  const { isAllowed, redirectPath = '/', children } = props;

  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return children || <Outlet />;
};

export default ProtectedRoute;
