import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/store/slices/userSlice';
import { render } from '@/utils/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import SignIn from '@/pages/SignIn/SignIn';

describe('Страница входа', () => {
  test('должна корректно рендериться', () => {
    const mockStore = configureStore({
      reducer: {
        user: userReducer,
      },
    });
    const { getByText } = render(
      <Provider store={mockStore}>
        <Router>
          <SignIn />
        </Router>
      </Provider>
    );

    expect(getByText('Вход')).toBeInTheDocument();
  });
});
