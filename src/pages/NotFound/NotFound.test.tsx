import { render } from '@/utils/test-utils';
import NotFound from '@/pages/NotFound/NotFound';

describe('Страница не найдена', () => {
  test('должна корректно рендериться', () => {
    const { getByText } = render(<NotFound />);

    expect(getByText('Page Not Found')).toBeInTheDocument();
  });
});
