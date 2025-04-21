import {registerService,findUserByEmail} from './service.js';
import { User } from './model.js';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  verifyToken,
  AuthUser
} from '../utils/jwt.js';
import bcrypt from 'bcrypt';
import path from 'path';
import fs from 'fs';
import ejs from 'ejs';
import nodemailer from 'nodemailer';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const registerController = async (req, res) => {
  try {
    const { name,email,password,role } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required',
       });
    }

    // check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    // Register user
    const user = await registerService({ name, email, password, role });
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: user,
    });

  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ 
        success: false,
        message: 'Internal server error',
     });
  }
}

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    // Check if user exists
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Generate JWT access token and refresh token
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      maxAge: Number(process.env.COOKEIE_EXPIRES_IN),
    };
    
    res
      .status(200)
      .cookie('refreshToken', refreshToken, options)
      .cookie('accessToken', accessToken, options)
      .json({
        success: true,
        message: 'User logged in successfully',
        data: {
          user,
          accessToken,
          refreshToken,
        }
      });
  } catch (error) {
    console.error('Error logging in user:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}

const changePasswordController = async (req, res) => {
  try {
    const { oldPassword, password, confirmPassword } = req.body;
    const user_info = await AuthUser(req);
    const userId = user_info.id;
  

    // Validate input
    if (!oldPassword || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: ' Current password and new password are required',
      });
    }

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Check old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect current password',
      });
    }

    // Check if new password and confirm password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'New password and confirm password do not match',
      });
    }


    // Update password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (error) {
    console.error('Error changing password:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}

const forgetPasswordController = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate input
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required',
      });
    }

    // Check if user exists
    let user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Generate forget password otp
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Set OTP expiration time 3 minute from now
    const forgetPasswordOtpExpires = Date.now() + 3 * 60 * 1000; // 3 minute
    // Update user with OTP and expiration time
    user.forget_password_otp = otp;
    user.forget_password_otp_expiry = forgetPasswordOtpExpires;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Reset password email sent successfully',
    });
    // Send OTP to user's email (you can use a service like Nodemailer or SendGrid)
    const emailTemplatePath = path.resolve(
      __dirname,
      "mails",
      "otp_mail.ejs"
    );
    const subject = "Songly Otp Code";
    const emailTemplate = fs.readFileSync(emailTemplatePath, "utf-8");
    const mailContent = ejs.render(emailTemplate, {name: user.name, code:otp });

    const trasnporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true, 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },  
    });
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: subject,
      html: mailContent,
    };
    await trasnporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending reset password email:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}

const verifyOtpController = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Validate input
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Email and OTP are required',
      });
    }

    // Check if user exists
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Check if OTP 
    if (user.forget_password_otp !== otp ) {
      return res.status(400).json({
        success: false,
        message: 'Incorrect OTP',
      });
    }

    // Check if OTP has expired
    const currentTime = Date.now();
    if (currentTime > user.forget_password_otp_expiry) {
      return res.status(400).json({
        success: false,
        message: 'OTP has expired',
      });
    }

    // OTP is valid, proceed with password reset
    res.status(200).json({
      success: true,
      message: 'OTP verified successfully',
    });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}

const resetPasswordController = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    // Validate input
    if (!email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Email, new password, and confirm password are required',
      });
    }

    // Check if user exists
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Check if OTP has expired
    const currentTime = Date.now();
    if (currentTime > user.forget_password_otp_expiry) {
      return res.status(400).json({
        success: false,
        message: 'OTP has expired',
      });
    }

    // Check if new password and confirm password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'New password and confirm password do not match',
      });
    }

    // Update password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.forget_password_otp = undefined; // Clear OTP after successful reset
    user.forget_password_otp_expiry = undefined; // Clear OTP expiry time
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password reset successfully',
    });
  } catch (error) {
    console.error('Error resetting password:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}

const refreshTokenController = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
  
    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token not found',
      });
    }

    // Verify refresh token
    const user = await verifyRefreshToken(refreshToken);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid refresh token',
      });
    }

    // Generate new access token
    const accessToken = generateAccessToken(user);
    const options = {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      maxAge: Number(process.env.COOKEIE_EXPIRES_IN),
    };

    res
      .status(200)
      .cookie('accessToken', accessToken, options)
      .json({
      success: true,
      message: 'Access token refreshed successfully',
      data: {user, accessToken, refreshToken },
    });
  } catch (error) {
    console.error('Error refreshing access token:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}

export { registerController, loginController, changePasswordController, forgetPasswordController,verifyOtpController, resetPasswordController, refreshTokenController };