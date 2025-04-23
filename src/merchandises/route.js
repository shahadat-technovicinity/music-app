import express from 'express';
import { MerchandiseController } from './controller.js';                                        
import { authMiddleware } from '../middleware/authMiddleware.js';
const router = express.Router();
// Merchandise routes
// router.get('/featured', MerchandiseController.getFeaturedMerchandise);
// router.get('/', MerchandiseController.getAllMerchandise);

export {router as MerchandiseRouter};