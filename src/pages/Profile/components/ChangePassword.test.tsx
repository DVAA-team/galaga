import { userApi } from '@/api/userApi';
import { render, screen } from '@/utils/test-utils';
import ChangePassword from './ChangePassword';

jest.mock('../../../api/userApi');

const mockedUserApi = jest.mocked(userApi, true);

const MOCKED_DATA = {
  newPassword: 'As1234567891',
  oldPassword: 'As1234567890',
  newPasswordRepeat: 'As1234567891',
};
const MOCKED_AXIOS_RESPONSE = {
  data: '',
  status: 200,
  statusText: '',
  headers: {},
  config: {},
};

test('Корректно рендериться все инпуты', async () => {
  render(<ChangePassword onClose={jest.fn()} />);

  const t = screen.getAllByPlaceholderText<HTMLInputElement>(
    /^Старый пароль$|^Новый пароль$|^Новый пароль \(еще раз\)$/
  );
  expect(t).toHaveLength(3);
});

test('Выводятся ошибки при не заполненных инпутах', async () => {
  const onClose = jest.fn();
  const { user } = render(<ChangePassword onClose={onClose} />);

  user.click(screen.getByRole('button', { name: /Применить/i }));

  const errors = await screen.findAllByText(/Необходимо заполнить/i);

  expect(errors).toHaveLength(3);
});

test('Корректно срабатывает событие `onSubmit`', async () => {
  mockedUserApi.editPassword.mockResolvedValue(MOCKED_AXIOS_RESPONSE);

  const onClose = jest.fn();
  const { user } = render(<ChangePassword onClose={onClose} />);

  await user.type(
    screen.getByPlaceholderText(/^Старый пароль$/),
    MOCKED_DATA.oldPassword
  );
  await user.type(
    screen.getByPlaceholderText(/^Новый пароль$/),
    MOCKED_DATA.newPassword
  );
  await user.type(
    screen.getByPlaceholderText(/^Новый пароль \(еще раз\)$/),
    MOCKED_DATA.newPasswordRepeat
  );

  await user.click(screen.getByRole('button', { name: /Применить/i }));

  expect(mockedUserApi.editPassword).toHaveBeenCalledWith(MOCKED_DATA);
});

describe('prop onClose()', () => {
  test('не вызывается если не заполнены инпуты', async () => {
    const onClose = jest.fn();
    const { user } = render(<ChangePassword onClose={onClose} />);

    await user.click(screen.getByRole('button', { name: /Применить/i }));

    expect(onClose).not.toHaveBeenCalled();
  });

  test('вызывается при нажатии кнопки `Отменить`', async () => {
    const onClose = jest.fn();
    const { user } = render(<ChangePassword onClose={onClose} />);

    await user.click(screen.getByRole('button', { name: /Отменить/i }));

    expect(onClose).toHaveBeenCalled();
  });

  test('вызывается после срабатывания события `onSubmit`', async () => {
    mockedUserApi.editPassword.mockResolvedValue(MOCKED_AXIOS_RESPONSE);

    const onClose = jest.fn();
    const { user } = render(<ChangePassword onClose={onClose} />);

    await user.type(
      screen.getByPlaceholderText(/^Старый пароль$/),
      MOCKED_DATA.oldPassword
    );
    await user.type(
      screen.getByPlaceholderText(/^Новый пароль$/),
      MOCKED_DATA.newPassword
    );
    await user.type(
      screen.getByPlaceholderText(/^Новый пароль \(еще раз\)$/),
      MOCKED_DATA.newPasswordRepeat
    );

    await user.click(screen.getByRole('button', { name: /Применить/i }));

    expect(onClose).toHaveBeenCalled();
  });
});
