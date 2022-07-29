import { render, screen } from '@/utils/test-utils';
import Button from './Button';

describe('Кнопка', () => {
  test('должна корректно рендериться с заданным текстом', () => {
    const buttonText = 'Кнопка';
    render(<Button text={buttonText} />);

    const renderedButton = screen.getByRole('button', { name: buttonText });

    expect(renderedButton).toBeInTheDocument();
  });

  test('должна вызывать callback', async () => {
    const buttonText = 'Кнопка';
    const onClose = jest.fn();
    const { user } = render(<Button text={buttonText} onClick={onClose} />);

    await user.click(screen.getByRole('button', { name: buttonText }));

    expect(onClose).toHaveBeenCalled();
  });
});
