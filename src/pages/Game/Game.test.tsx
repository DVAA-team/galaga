import { render } from '@/utils/test-utils';
import Game from '@/pages/Game/Game';

describe('Страница игры', () => {
  test('должна корректно рендериться', () => {
    const { getByText } = render(<Game />);

    expect(getByText('Начать игру')).toBeInTheDocument();
  });
});
