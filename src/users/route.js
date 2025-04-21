import express from 'express';
import {registerController, loginController,changePasswordController,forgetPasswordController,verifyOtpController,resetPasswordController, refreshTokenController} from './controller.js';

const router = express.Router();

// register route
router.post('/register', registerController);

// login route
router.post('/login', loginController);
router.post('/change-password', changePasswordController);

// forgot password route
router.post('/forget-password',forgetPasswordController);
router.post('/forget-password/verify-otp', verifyOtpController);
router.post('/reset-password', resetPasswordController);

// refresh token route
router.post('/refresh-token', refreshTokenController);
export {router as AuthRouter};