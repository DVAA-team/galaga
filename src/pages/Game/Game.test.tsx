import { render } from '@/utils/test-utils';
import Game from '@/pages/Game/Game';

describe.skip('Страница игры', () => {
  test('должна корректно рендериться', () => {
    const { getByText } = render(<Game />);

    expect(getByText('Начать игру')).toBeInTheDocument();
  });
});
