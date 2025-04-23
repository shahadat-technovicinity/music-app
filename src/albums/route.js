import express from 'express';
import { AlbumController } from './controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
const router = express.Router();
// Album routes
router.get('/', AlbumController.getAllAlbums);

export { router as AlbumRouter };