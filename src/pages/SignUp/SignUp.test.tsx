import { render } from '@/utils/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import SignUp from '@/pages/SignUp/SignUp';
import { initialStore } from '@/store';

describe('Страница регистрации', () => {
  test('должна корректно рендериться', () => {
    const mockStore = initialStore();
    const { getByText } = render(
      <Provider store={mockStore}>
        <Router>
          <SignUp />
        </Router>
      </Provider>
    );

    expect(getByText('Регистрация')).toBeInTheDocument();
  });
});
