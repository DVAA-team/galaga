import { Op } from 'sequelize';
import { SiteTheme } from '@/database/models';
import { TUmugMigrationFn } from '@/database/types';

export const up: TUmugMigrationFn = async ({
  context: { sequelize, transaction },
}) => {
  SiteTheme.registration(sequelize);

  await SiteTheme.bulkCreate(
    [
      {
        name: 'Stars',
        description: 'Звездная тема',
        theme: {
          colorVars: {
            accent: '',
            error: '',
            info: '',
            primary: '',
            secondary: '',
            success: '',
            warning: '',
          },
          bgClass: 'bg-theme-stars',
        },
      },
      {
        name: 'Neon',
        description: 'Неоновая тема',
        theme: {
          colorVars: {
            accent: '',
            error: '',
            info: '',
            primary: '',
            secondary: '',
            success: '',
            warning: '',
          },
          bgClass: 'bg-theme-neon',
        },
      },
    ],
    { transaction }
  );
};

export const down: TUmugMigrationFn = async ({
  context: { sequelize, transaction },
}) => {
  SiteTheme.registration(sequelize);
  await SiteTheme.destroy({
    where: { [Op.or]: [{ name: 'Stars' }, { name: 'Neon' }] },
    transaction,
  });
};
