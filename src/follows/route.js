import express from 'express';
import { FollowController } from './controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/:id', authMiddleware, FollowController.followUser);
router.delete('/:id', authMiddleware, FollowController.unfollowUser);
router.get('/followers', authMiddleware, FollowController.getFollowers);
router.get('/followings', authMiddleware, FollowController.getFollowings);

export { router as FollowRouter };