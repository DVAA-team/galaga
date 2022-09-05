import { useAuth } from '@/hooks/useAuth';
import { useEffect, useRef, useState } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => {
  const userData = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(!!userData);

  useEffect(() => {
    if (userData !== null) {
      setIsAuthorized(true);
    }
  }, [userData]);

  const [isOpen, setIsOpen] = useState(false);

  const handlerClickOpen = () => {
    setIsOpen(!isOpen);
  };

  const navEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = ({ target }: MouseEvent): void => {
      if (!navEl.current?.contains(target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const getLinkClassName: NavLinkProps['className'] = ({ isActive }) =>
    isActive ? `${styles.link} ${styles['link-active']}` : styles.link;

  const renderNotAuthLinks = () => {
    return (
      <>
        <li>
          <NavLink className={getLinkClassName} to="/sign-in">
            🏃&#160;&#160;Войти
          </NavLink>
        </li>
        <li>
          <NavLink className={getLinkClassName} to="/sign-up">
            🏃‍♂️&#160;&#160;Зарегистрироваться
          </NavLink>
        </li>
      </>
    );
  };

  const renderAuthLinks = () => {
    return (
      <li>
        <NavLink className={getLinkClassName} to="/profile">
          👨&#160;&#160;Профиль
        </NavLink>
      </li>
    );
  };

  return (
    <div className={styles.navigation} ref={navEl}>
      <button className={styles.toogler} onClick={handlerClickOpen}></button>
      <nav className={`${styles.list} ${isOpen ? styles['list-open'] : ''}`}>
        <ul>
          <li>
            <NavLink className={getLinkClassName} to="/">
              🏠&#160;&#160;Главная
            </NavLink>
          </li>
          {isAuthorized ? renderAuthLinks() : renderNotAuthLinks()}
          <li>
            <NavLink className={getLinkClassName} to="/game">
              🚀&#160;&#160;Играть
            </NavLink>
          </li>
          <li>
            <NavLink className={getLinkClassName} to="/leaderboard">
              ✨&#160;&#160;Лидеры
            </NavLink>
          </li>
          <li>
            <NavLink className={getLinkClassName} to="/forum">
              🫖&#160;&#160;Форум
            </NavLink>
          </li>
          <li>
            <NavLink className={getLinkClassName} to="/dashboard">
              🤩&#160;&#160;Dashboard
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
