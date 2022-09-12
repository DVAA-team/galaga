import { render } from '@/utils/test-utils';
import Dashboard from '@/pages/Dashboard/Dashboard';
import { MemoryRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { initialStore } from '@/store';

describe('Страница дашборда', () => {
  test('должна корректно рендериться', () => {
    const mockStore = initialStore();
    const { getByText } = render(
      <Provider store={mockStore}>
        <Router>
          <Dashboard />
        </Router>
      </Provider>
    );

    expect(getByText('Dashboard page')).toBeInTheDocument();
  });
});
