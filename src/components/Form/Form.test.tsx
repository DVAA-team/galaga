import { render, screen } from '@/utils/test-utils';
import Form from '@/components/Form/Form';
import { Button } from '@/components/Button';

describe.skip('Форма', () => {
  test('должна корректно рендериться', () => {
    const onSubmit = jest.fn();
    const { container } = render(<Form handlerSubmit={onSubmit} />);

    expect(container.querySelector('form')).toBeInTheDocument();
  });

  test('должна вызывать callback', async () => {
    // https://stackoverflow.com/questions/62216232/error-not-implemented-htmlformelement-prototype-submit
    const onSubmit = jest.fn((e) => e.preventDefault());
    const { user, container } = render(
      <Form handlerSubmit={onSubmit}>
        <Button type="submit" />
      </Form>
    );

    expect(container.querySelector('form')).toBeInTheDocument();
    await user.click(screen.getByRole('button'));
    expect(onSubmit).toHaveBeenCalled();
  });

  test('должна отображать заголовок', () => {
    const onSubmit = jest.fn();
    const { getByText } = render(
      <Form handlerSubmit={onSubmit} title="Заголовок формы" />
    );

    expect(getByText('Заголовок формы')).toBeInTheDocument();
  });
});
