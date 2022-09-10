import { render } from '@/utils/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import SignIn from '@/pages/SignIn/SignIn';
import { initialStore } from '@/store';

describe('Страница входа', () => {
  test('должна корректно рендериться', () => {
    const mockStore = initialStore();
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
