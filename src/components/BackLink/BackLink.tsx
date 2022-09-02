import { useNavigate, useLocation } from 'react-router-dom';
import styles from './BackLink.module.css';

const BackLink = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const isChildrenRoute =
    pathname.slice(1).replace(/\/+$/, '').split('/').length > 1;

  return (
    <button
      className={styles.back}
      onClick={() => navigate(isChildrenRoute ? '../' : '/')}
      disabled={pathname === '/'}
    ></button>
  );
};

export default BackLink;
