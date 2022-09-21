import { Router } from 'express';

const router: Router = Router();

router.use((req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

export default router;
