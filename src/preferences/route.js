import express from 'express';

import { PreferencesController } from './controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/', authMiddleware, PreferencesController.getAllPreferences);
router.get('/:id', authMiddleware, PreferencesController.getPreferenceById);
router.post('/:id', authMiddleware, PreferencesController.updatePreference);
router.post('/', authMiddleware, PreferencesController.createPreference);
router.delete('/:id', authMiddleware, PreferencesController.deletePreference);

export { router as PreferencesRouter };

