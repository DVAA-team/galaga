import { ThemesController } from '@/server/controllers/themes';
import { Router } from 'express';

const router: Router = Router();

router.route('/themes').get(ThemesController.getThemes);

router.route('/themes/user').patch(ThemesController.setUserTheme);

router.route('/themes/user/darkMode').patch(ThemesController.setUserDarkMode);

export default router;
