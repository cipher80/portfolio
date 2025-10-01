import { Router } from 'express';
import profileRoutes from './profile.routes.js';
import contactRoutes from './contact.routes.js';

const router = Router();

router.get('/health', (req, res) => {
  res.json({ ok: true, service: 'portfolio-api' });
});

router.use('/contact', contactRoutes);

router.use('/profile', profileRoutes);

export default router;
