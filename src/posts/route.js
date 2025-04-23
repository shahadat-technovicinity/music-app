import express from 'express';
import { PostController } from './controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import {upload} from '../middleware/uploadFile.js';
const router = express.Router();

router.post('/', authMiddleware,upload.single("photo"), PostController.createPost);
router.get('/', authMiddleware, PostController.getAllPosts);
router.get('/:id', authMiddleware, PostController.getPostById);
router.post('/:id', authMiddleware,upload.single("photo"), PostController.updatePost);
router.delete('/:id', authMiddleware, PostController.deletePost);

// Likes
router.post('/:id/like', authMiddleware, PostController.likePost);
router.delete('/:id/like', authMiddleware, PostController.unlikePost);

// Comments
router.post('/:id/comment', authMiddleware, PostController.commentOnPost);
router.get('/:id/comments', authMiddleware, PostController.getAllComments);
// router.get('/:postId/comments/:commentId', authMiddleware, PostController.getCommentById);
// router.put('/:postId/comments/:commentId', authMiddleware, PostController.updateComment);
// router.delete('/:postId/comments/:commentId', authMiddleware, PostController.deleteComment);

// Shares
router.post('/:id/share', authMiddleware, PostController.sharePost);

export { router as PostRouter };