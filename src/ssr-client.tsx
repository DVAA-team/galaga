import './assets/styles/main.css';
import { hydrateRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import SsrApp from '@/components/SsrApp/SsrApp';
import React from 'react';
import { StaticRouter } from 'react-router-dom/server';
import { BrowserRouter } from 'react-router-dom';
import { initialStore } from './store';
import type { TRootState } from './store';
import { registerServiceWorker } from './registerServiceWorker';

type TServerBundleProps = {
  location: string;
  initialState: TRootState;
  data?: unknown;
};

export const Bundle: React.FC<TServerBundleProps> = (props) => {
  const { location, initialState } = props;
  return (
    <Provider store={initialStore(initialState)}>
      <StaticRouter location={location}>
        <SsrApp />
      </StaticRouter>
    </Provider>
  );
};

// В параметры функции можно добавить принимаемы переменные чтобы инициализировать состояние клиента
export default (initialState: TRootState) => {
  const container = document.getElementById('root');
  if (container !== null) {
    hydrateRoot(
      container,
      <Provider store={initialStore(initialState)}>
        <BrowserRouter>
          <SsrApp />
        </BrowserRouter>
      </Provider>
    );
  }
  registerServiceWorker();
};
