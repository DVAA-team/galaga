import { User } from '@/database/models';
import { TUmugMigrationFn } from '@/database/types';

export const up: TUmugMigrationFn = async ({
  context: { sequelize, transaction },
}) => {
  User.registration(sequelize);
  await User.create(
    {
      /* eslint-disable @typescript-eslint/naming-convention */
      login: 'Test',
      first_name: 'Тест',
      second_name: 'Тестов',
      display_name: 'Test',
      email: 'test@test.test',
      phone: '79344782343',
      /* eslint-enable @typescript-eslint/naming-convention */
    },
    { transaction }
  );
};

export const down: TUmugMigrationFn = async ({
  context: { sequelize, transaction },
}) => {
  User.registration(sequelize);
  await User.destroy({ where: { login: 'Test' }, transaction });
};
