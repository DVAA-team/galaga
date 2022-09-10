import { render } from '@/utils/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import Profile from '@/pages/Profile/Profile';
import { initialStore } from '@/store';

describe('Страница профиля', () => {
  test('должна корректно рендериться', () => {
    const mockStore = initialStore();
    const { getByText } = render(
      <Provider store={mockStore}>
        <Router>
          <Profile />
        </Router>
      </Provider>
    );

    expect(getByText('Профиль')).toBeInTheDocument();
  });
});
