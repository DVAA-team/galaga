import { render } from '@/utils/test-utils';
import Input from '@/components/Input/Input';

describe('Инпут', () => {
  test('должен корректно рендериться', () => {
    const { container } = render(<Input name="login" />);

    expect(container.querySelector('input')).toHaveAttribute('name', 'login');
  });

  test('должен показывать метку и текст метки', () => {
    const { container, getByText } = render(
      <Input name="login" labelText="Логин" withLabel={true} />
    );

    expect(container.querySelector('label')).toBeInTheDocument();
    expect(getByText('Логин')).toBeInTheDocument();
  });
});
