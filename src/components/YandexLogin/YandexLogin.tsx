import { useEffect, useState } from 'react';
import yandexOAuthService from '@/services/yandexOAuthService';
import yandexLogo from '@/assets/images/ico/brands/yandex.svg';
import { TProps } from './types';
import styles from './YandexLogin.module.css';

const YandexLogin: TProps = () => {
  const [targetUrl, setTargetUrl] = useState('');

  useEffect(() => {
    yandexOAuthService.getAuthorizeUrl().then((url) => {
      setTargetUrl(url);
    });
  });

  return (
    <>
      {targetUrl ? (
        <a
          href={targetUrl}
          className="button bg-white hover:bg-gray-100 text-black font-bold py-2 px-4 rounded block mx-auto"
        >
          <div className="flex items-center justify-center">
            <img src={yandexLogo} alt="" className={styles.avatar} />
            <span>Войти с Яндекс ID</span>
          </div>
        </a>
      ) : null}
    </>
  );
};

export default YandexLogin;
