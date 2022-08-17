import './assets/styles/main.css';
import { hydrateRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import SsrApp from '@/components/SsrApp/SsrApp';
import React from 'react';
import { StaticRouter } from 'react-router-dom/server';
import { store } from './store';

export const Bundle: React.FC = () => {
  return <SsrApp />;
};

type TBundleProps = {
  location?: string;
};

export default (ssrProps: TBundleProps) => {
  const { location = '' } = ssrProps;

  const container = document.getElementById('root');
  if (container !== null) {
    hydrateRoot(
      container,
      <Provider store={store}>
        <StaticRouter location={location}>
          <SsrApp />
        </StaticRouter>
      </Provider>
    );
  }
};
