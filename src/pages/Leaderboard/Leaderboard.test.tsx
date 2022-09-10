import { render } from '@/utils/test-utils';
import Leaderboard from '@/pages/Leaderboard/Leaderboard';
import { MemoryRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { initialStore } from '@/store';

describe('Страница лидерборда', () => {
  test('должна корректно рендериться', () => {
    const mockStore = initialStore();
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
