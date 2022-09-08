import ToggleButton from '@/components/ToggleButton/ToggleButton';
import { useAuth } from '@/hooks/useAuth';
import { useDarkMode } from '@/hooks/useDarkMode';
import themeService from '@/services/themeService';
import { ChangeEventHandler, FC } from 'react';
import { BackLink } from '../BackLink';
import { Navigation } from '../Navigation';
import { PageTitle } from '../PageTitle';
import styles from './Header.module.css';

type TOwnProps = {
  cls?: string;
  title?: React.ReactNode;
  withoutBackLink?: boolean;
};

type TProps = FC<TOwnProps>;

const Header: TProps = ({ title, withoutBackLink, cls = '' }) => {
  const [darkMode, setDarkMode] = useDarkMode();
  const user = useAuth();

  const onChangeDarkMode: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { checked } = event.currentTarget;
    setDarkMode(checked);
    if (user) {
      themeService.editUserDarkMode({
        yandexUserId: user.id,
        darkMode: checked,
      });
    }
  };

  return (
    <header className={`${styles.header} ${cls} z-50`}>
      <div className="container mx-auto flex justify-between content-center items-center flex-wrap py-5">
        {!withoutBackLink && <BackLink />}
        {title && <PageTitle>{title}</PageTitle>}
        <div className="flex gap-3 justify-center content-center items-center">
          <ToggleButton
            name="darkMode"
            checked={darkMode}
            onChange={onChangeDarkMode}
          />
          <Navigation />
        </div>
      </div>
    </header>
  );
};

export default Header;
