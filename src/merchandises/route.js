import express from 'express';
import { MerchandiseController } from './controller.js';                                        
import { authMiddleware } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadFile.js';
const router = express.Router();

router.post('/', authMiddleware,upload.array("photes", 4), MerchandiseController.createMerchandise);

export {router as MerchandiseRouter};