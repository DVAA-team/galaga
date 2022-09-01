import { useNavigate, useLocation } from 'react-router-dom';
import styles from './BackLink.module.css';

const BackLink = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  return (
    <button
      className={styles.back}
      onClick={() => navigate('/')}
      disabled={pathname === '/'}
    ></button>
  );
};

export default BackLink;
