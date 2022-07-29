import { render } from '@/utils/test-utils';
import Leaderboard from '@/pages/Leaderboard/Leaderboard';

describe('Страница лидерборда', () => {
  test('должна корректно рендериться', () => {
    const { getByText } = render(<Leaderboard />);

    expect(getByText('Leaderboard page')).toBeInTheDocument();
  });
});
