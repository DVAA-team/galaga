import { render } from '@/utils/test-utils';
import Dashboard from '@/pages/Dashboard/Dashboard';

describe('Страница дашборда', () => {
  test('должна корректно рендериться', () => {
    const { getByText } = render(<Dashboard />);

    expect(getByText('Dashboard page')).toBeInTheDocument();
  });
});
