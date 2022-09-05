import { render } from '@/utils/test-utils';
import Leaderboard from '@/pages/Leaderboard/Leaderboard';
import { MemoryRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import userReducer from '@/store/slices/userSlice';
import { configureStore } from '@reduxjs/toolkit';

describe('Страница лидерборда', () => {
  test('должна корректно рендериться', () => {
    const mockStore = configureStore({
      reducer: {
        user: userReducer,
      },
    });
    const { getByText } = render(
      <Provider store={mockStore}>
        <Router>
          <Leaderboard />
        </Router>
      </Provider>
    );

    expect(getByText('Лучшие игроки')).toBeInTheDocument();
  });
});
