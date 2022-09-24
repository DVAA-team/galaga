import './assets/styles/main.css';
import { hydrateRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import SsrApp from '@/components/SsrApp/SsrApp';
import React from 'react';
import { StaticRouter } from 'react-router-dom/server';
import { BrowserRouter } from 'react-router-dom';
import createDebug from '@/utils/debug';
import { env } from '@/config';
import changeTheme from '@/utils/changeTheme';
import { YMInitializer } from 'react-yandex-metrika';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { initialStore } from './store';
import type { TRootState } from './store';
import { registerServiceWorker } from './registerServiceWorker';

const debug = createDebug('index');

type TServerBundleProps = {
  location: string;
  initialState: TRootState;
  data?: unknown;
};

export const Bundle: React.FC<TServerBundleProps> = (props) => {
  const { location, initialState } = props;
  debug('render ssr-bundle with props %j', props);
  return (
    <ErrorBoundary>
      <Provider store={initialStore(initialState)}>
        <StaticRouter location={location}>
          <SsrApp />
          <YMInitializer
            accounts={[90532923]}
            options={{ webvisor: true }}
            version="2"
          />
        </StaticRouter>
      </Provider>
    </ErrorBoundary>
  );
};

// В параметры функции можно добавить принимаемы переменные чтобы инициализировать состояние клиента
export default (initialState: TRootState) => {
  const container = document.getElementById('root');
  debug('hydrate web-client with initialState %O', initialState);

  changeTheme(initialState.themes.current, initialState.themes.darkMode);

  if (container !== null) {
    hydrateRoot(
      container,
      <ErrorBoundary>
        <Provider store={initialStore(initialState)}>
          <BrowserRouter>
            <SsrApp />
            <YMInitializer
              accounts={[90532923]}
              options={{ webvisor: true }}
              version="2"
            />
          </BrowserRouter>
        </Provider>
      </ErrorBoundary>
    );
  }

  if (env.isProd()) {
    registerServiceWorker();
  }
};
