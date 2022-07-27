import {
  clientToServerNaming,
  serverToClientNaming,
} from '@/utils/convertNaming';

const client = {
  firstName: 'John',
  lastName: 'Doe',
};

/* eslint-disable @typescript-eslint/naming-convention */
const server = {
  first_name: 'John',
  last_name: 'Doe',
};
/* eslint-enable @typescript-eslint/naming-convention */

describe('Конвертация имен', () => {
  test('функция clientToServerNaming должна корректно работать', () => {
    expect(clientToServerNaming(client)).toEqual(server);
  });
  test('функция serverToClientNaming должна корректно работать', () => {
    expect(serverToClientNaming(server)).toEqual(client);
  });
});
