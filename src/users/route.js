import express from 'express';
import { UserController } from './controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import {upload} from '../middleware/uploadFile.js';
import { validate } from '../middleware/validate.js';
import { UserValidation } from './validation.js';
const router = express.Router();


router.get('/',authMiddleware, UserController.getAllUsers);
router.get('/user',authMiddleware, UserController.getUserById);
router.post('/user',authMiddleware,upload.single("photo"), validate(UserValidation.updateUserSchema) ,UserController.updateUser);
export {router as UserRouter};