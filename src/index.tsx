import { createRoot } from 'react-dom/client';
import App from './components/App/App';

const container = document.getElementById('root');
if (container !== null) {
  const root = createRoot(container);
  root.render(<App />);
}
