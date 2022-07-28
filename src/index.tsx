import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './components/App/App';
import { registerServiceWorker } from './registerServiceWorker';

const container = document.getElementById('root');
if (container !== null) {
  const root = createRoot(container);
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}

registerServiceWorker();
