import express from 'express';
import { SongController } from './controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadFile.js';

const router = express.Router();
router.post(
    '/',
    authMiddleware,
    upload.fields([
      { name: 'photo', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
    SongController.uploadSingleSong
  );
// router.post('/', authMiddleware, SongController.uploadSingleSong);
// router.get('/', SongController.getAllSongs);
// router.get('/:id', SongController.getSongById);
// router.put('/:id', authMiddleware, SongController.updateSong);
// router.delete('/:id', authMiddleware, SongController.deleteSong);
// router.get('/new', SongController.getNewReleases);
// router.get('/trending', SongController.getTrendingSongs);
// router.get('/recommended', authMiddleware, SongController.getRecommendedSongs);

export {router as SongRouter};
