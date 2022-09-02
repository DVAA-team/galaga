import { notifyInfo } from '@/utils/notify';
import { FC } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

type TOwnProps = {
  isAllowed: boolean;
  redirectPath: string;
  children?: JSX.Element;
  notify?: string;
};

type TProps = FC<TOwnProps>;

const ProtectedRoute: TProps = (props) => {
  const { isAllowed, redirectPath = '/', children, notify } = props;
  const location = useLocation();

  if (!isAllowed) {
    if (notify) {
      notifyInfo(notify);
    }
    return <Navigate state={{ from: location }} to={redirectPath} replace />;
  }

  return children || <Outlet />;
};

export default ProtectedRoute;
