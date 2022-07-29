import { render } from '@/utils/test-utils';
import Avatar from './Avatar';

describe('Аватар', () => {
  test('должен корректно рендериться', () => {
    const { container } = render(
      <Avatar src="/static/sprite.svg#avatar-usage" />
    );

    expect(container.querySelector('img')).toHaveAttribute(
      'src',
      '/static/sprite.svg#avatar-usage'
    );
  });

  test('должен корректно добавлять классы', () => {
    const { container } = render(
      <Avatar type="circle" borderType="gold" size="xs" />
    );

    expect(container.querySelector('.avatar')).toHaveClass(
      'avatar-circle',
      'avatar-border-gold',
      'avatar-xs'
    );
  });

  test('должен показывать бэйдж', () => {
    const { getByText } = render(<Avatar badge="1" />);

    expect(getByText('1')).toBeInTheDocument();
  });
});
