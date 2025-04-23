import express from 'express';
import { SongController } from './controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { uploadMulti } from '../middleware/uploadMultiple.js';

const router = express.Router();
router.post(
    '/',
    authMiddleware,
    uploadMulti.fields([
      { name: 'photo', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
      { name: 'lyrics', maxCount: 1 },
    ]),
    SongController.uploadSingleSong
  );
router.get('/', authMiddleware,SongController.getAllSongs);
router.get('/:id',authMiddleware, SongController.getSongById);
router.post('/:id', authMiddleware,uploadMulti.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'audio', maxCount: 1 },
  { name: 'lyrics', maxCount: 1 },
]), SongController.updateSong);
router.delete('/:id', authMiddleware, SongController.deleteSong);
// router.get('/new', SongController.getNewReleases);
// router.get('/trending', SongController.getTrendingSongs);
// router.get('/recommended', authMiddleware, SongController.getRecommendedSongs);

export {router as SongRouter};
