import express from 'express';
import { DownloadController } from './controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
const router = express.Router();

// Get all downloads for authenticated user
router.get('/my-downloads', authMiddleware, DownloadController.getUserDownloads);

export {router as DownloadRoter};
