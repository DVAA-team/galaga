import { render } from '@/utils/test-utils';
import App from '@/components/App/App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/store/slices/userSlice';
import { userApi } from '@/api/userApi';
import { waitFor } from '@testing-library/react';

jest.mock('../../api/userApi');

const mockedUserApi = jest.mocked(userApi, true);
/* eslint-disable @typescript-eslint/naming-convention */
const MOCKED_AXIOS_RESPONSE_AUTHORIZED = {
  data: {
    avatar: null,
    display_name: null,
    email: 'test@yandex.ru',
    first_name: 'John',
    id: 13857,
    login: 'JohnDoe',
    phone: '89999999999',
    second_name: 'Doe',
  },
  status: 200,
  statusText: '',
  headers: {},
  config: {},
};
const MOCKED_AXIOS_RESPONSE_NOT_AUTHORIZED = {
  data: { reason: 'Cookie is not valid' },
  status: 401,
  statusText: '',
  headers: {},
  config: {},
};
/* eslint-enable @typescript-eslint/naming-convention */
describe('Приложение', () => {
  test('должно корректно рендериться c авторизованным пользователем', async () => {
    mockedUserApi.getUser.mockResolvedValue(MOCKED_AXIOS_RESPONSE_AUTHORIZED);

    const mockStore = configureStore({
      reducer: {
        user: userReducer,
      },
    });

    const { getByText } = render(
      <Provider store={mockStore}>
        <App />
      </Provider>
    );

    await waitFor(() => expect(getByText('Profile')).toBeInTheDocument());
  });

  test('должно корректно рендериться c неавторизованным пользователем', async () => {
    mockedUserApi.getUser.mockRejectedValue(
      MOCKED_AXIOS_RESPONSE_NOT_AUTHORIZED
    );

    const mockStore = configureStore({
      reducer: {
        user: userReducer,
      },
    });

    const { getByText } = render(
      <Provider store={mockStore}>
        <App />
      </Provider>
    );

    await waitFor(() => expect(getByText('Sign-in page')).toBeInTheDocument());
  });
});
