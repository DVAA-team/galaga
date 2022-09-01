import { FC } from 'react';
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
  return (
    <header className={`${styles.header} ${cls} z-50`}>
      <div className="container mx-auto flex justify-between content-center items-center flex-wrap py-5">
        {!withoutBackLink && <BackLink />}
        {title && <PageTitle>{title}</PageTitle>}
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
