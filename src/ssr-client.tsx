import './assets/styles/main.css';
import { hydrateRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import SsrApp from '@/components/SsrApp/SsrApp';
import React from 'react';
import { StaticRouter } from 'react-router-dom/server';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store';
import { registerServiceWorker } from './registerServiceWorker';

type TServerBundleProps = {
  location: string;
  data?: unknown;
};

export const Bundle: React.FC<TServerBundleProps> = (props) => {
  const { location } = props;
  return (
    <Provider store={store}>
      <StaticRouter location={location}>
        <SsrApp />
      </StaticRouter>
    </Provider>
  );
};

// В параметры функции можно добавить принимаемы переменные чтобы инициализировать состояние клиента
export default () => {
  const container = document.getElementById('root');
  if (container !== null) {
    hydrateRoot(
      container,
      <Provider store={store}>
        <BrowserRouter>
          <SsrApp />
        </BrowserRouter>
      </Provider>
    );
  }
  registerServiceWorker();
};
