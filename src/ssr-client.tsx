import { hydrateRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import SsrApp from '@/components/SsrApp/SsrApp';
import { store } from './store';
// import App from './components/App/App';
// import { registerServiceWorker } from './registerServiceWorker';

const container = document.getElementById('root');
if (container !== null) {
  hydrateRoot(
    container,
    <Provider store={store}>
      <SsrApp />
    </Provider>
  );
}

// registerServiceWorker();
