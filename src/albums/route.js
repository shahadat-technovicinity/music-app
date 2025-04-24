import express from 'express';
import { AlbumController } from './controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadFile.js';

const router = express.Router();

// Create an album
router.post('/', authMiddleware,upload.single("photo"), AlbumController.createAlbum);

// Edit an album
router.post('/:id', authMiddleware,upload.single("photo"), AlbumController.editAlbum);

// Delete an album
router.get('/', authMiddleware, AlbumController.getAllAlbums);
router.get('/:id', authMiddleware, AlbumController.getAlbum);
router.delete('/:id', authMiddleware, AlbumController.deleteAlbum);

export { router as AlbumRouter };