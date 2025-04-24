import express from 'express';
import { PurchaseController } from './controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/cart', authMiddleware, PurchaseController.addToCart);
router.get('/cart', authMiddleware, PurchaseController.getCart);
router.delete('/cart/:itemId', authMiddleware, PurchaseController.removeFromCart);
router.post('/checkout', authMiddleware, PurchaseController.checkout);
router.post('/payment-success/:sessionId', authMiddleware, PurchaseController.paymentSuccess);
// router.get('/downloads/:id', authMiddleware, PurchaseController.downloadItem);

export { router as PurchaseRouter };
