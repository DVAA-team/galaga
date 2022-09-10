import { render } from '@/utils/test-utils';
import Home from '@/pages/Home/Home';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { initialStore } from '@/store';

describe('Страница домашняя', () => {
  test('должна корректно рендериться', () => {
    const mockStore = initialStore();
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
