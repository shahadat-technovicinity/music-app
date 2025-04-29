import express from 'express';
import {SizeController} from './controller.js';
import {authMiddleware} from '../middleware/authMiddleware.js'

const router = express.Router();
router.get('/', authMiddleware,SizeController.getAllSizes);
router.post('/', authMiddleware,SizeController.addSize);
router.post('/:id', authMiddleware,SizeController.updateSize);
router.delete('/:id', authMiddleware,SizeController.deleteSize);

export {router as SizeRouter};