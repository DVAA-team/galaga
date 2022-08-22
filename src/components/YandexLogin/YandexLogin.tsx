import { useEffect, useState } from 'react';
import yandexOAuthService from '@/services/yandexOAuthService';
import { TProps } from './types';

const YandexLogin: TProps = () => {
  const [targetUrl, setTargetUrl] = useState('');

  useEffect(() => {
    yandexOAuthService.getAuthorizeUrl().then((url) => {
      setTargetUrl(url);
    });
  });

  return <a href={targetUrl}>Войти через Яндекс</a>;
};

export default YandexLogin;
