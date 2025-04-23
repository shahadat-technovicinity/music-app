import express from 'express';
import {registerController, loginController,changePasswordController,forgetPasswordController,verifyOtpController,resetPasswordController, refreshTokenController,logoutController} from './controller.js';
import {upload} from '../middleware/uploadFile.js';
import {validate} from '../middleware/validate.js';
import {AuthValidation} from './validation.js';

const router = express.Router();

// register route
router.post('/register',upload.single("photo"),validate(AuthValidation.register), registerController);

// login route
router.post('/login',validate(AuthValidation.login), loginController);
router.post('/change-password',validate(AuthValidation.changePassword), changePasswordController);

// forgot password route
router.post('/forget-password',validate(AuthValidation.forgotPassword),forgetPasswordController);
router.post('/forget-password/verify-otp',validate(AuthValidation.verifyOtp), verifyOtpController);
router.post('/reset-password',validate(AuthValidation.resetPassword),resetPasswordController);

// refresh token route
router.post('/refresh-token', refreshTokenController);

// logout route
router.post('/logout', logoutController);
export {router as AuthRouter};