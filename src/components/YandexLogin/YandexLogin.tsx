import yandexLogo from '../../assets/images/ico/brands/yandex.svg';
import { TProps } from './types';
import styles from './YandexLogin.module.css';

const YandexLogin: TProps = () => {
  return (
    <a
      href="/api/auth/yandex"
      className="button bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-black font-bold py-2 px-4 rounded block mx-auto"
    >
      <div className="flex items-center justify-center">
        <img src={yandexLogo} alt="" className={styles.avatar} />
        <span>Войти с Яндекс ID</span>
      </div>
    </a>
  );
};

export default YandexLogin;
