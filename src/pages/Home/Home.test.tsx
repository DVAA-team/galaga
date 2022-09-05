import { render } from '@/utils/test-utils';
import Home from '@/pages/Home/Home';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/store/slices/userSlice';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';

describe('Страница домашняя', () => {
  test('должна корректно рендериться', () => {
    const mockStore = configureStore({
      reducer: {
        user: userReducer,
      },
    });
    const { getByText } = render(
      <Provider store={mockStore}>
        <Router>
          <Home />
        </Router>
      </Provider>
    );

    expect(getByText('Ретро космический шутер')).toBeInTheDocument();
  });
});
