import { SiteTheme, User, UserTheme } from '@/database/models';
import { TUmzugMigrationFn } from '@/database/types';

export const up: TUmzugMigrationFn = async ({
  context: { sequelize, transaction },
}) => {
  SiteTheme.registration(sequelize);
  User.registration(sequelize);
  UserTheme.registration(sequelize);
  const newUser = await User.create(
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
  const starsTheme = await SiteTheme.findOne({
    where: { name: 'Stars' },
    transaction,
  });
  if (!starsTheme) {
    throw new Error('Нет такой темы');
  }
  UserTheme.create({
    darkMode: true,
    ownerId: newUser.id,
    themeId: starsTheme.id,
  });
};

export const down: TUmzugMigrationFn = async ({
  context: { sequelize, transaction },
}) => {
  User.registration(sequelize);
  await User.destroy({ where: { login: 'Test' }, transaction });
};
