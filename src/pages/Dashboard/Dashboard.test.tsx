import { render } from '@/utils/test-utils';
import Dashboard from '@/pages/Dashboard/Dashboard';
import { MemoryRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import userReducer from '@/store/slices/userSlice';
import { configureStore } from '@reduxjs/toolkit';

describe('Страница дашборда', () => {
  test('должна корректно рендериться', () => {
    const mockStore = configureStore({
      reducer: {
        user: userReducer,
      },
    });
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
