import { useLocation, Link } from 'react-router-dom';
import styles from './BackLink.module.css';

const BackLink = () => {
  const location = useLocation();
  const { pathname } = location;

  const isChildrenRoute =
    pathname.slice(1).replace(/\/+$/, '').split('/').length > 1;

  return (
    <Link to={isChildrenRoute ? '../' : '/'} state={{ from: pathname }}>
      <button className={styles.back} disabled={pathname === '/'}></button>
    </Link>
  );
};

export default BackLink;
