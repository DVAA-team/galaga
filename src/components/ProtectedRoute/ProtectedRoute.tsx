import { FC } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

type TOwnProps = {
  isAllowed: boolean;
  redirectPath: string;
  children?: JSX.Element;
};

type TProps = FC<TOwnProps>;

const ProtectedRoute: TProps = (props) => {
  const { isAllowed, redirectPath = '/', children } = props;
  const location = useLocation();

  if (!isAllowed) {
    return <Navigate state={{ from: location }} to={redirectPath} replace />;
  }

  return children || <Outlet />;
};

export default ProtectedRoute;
