import Joi from 'joi';

const register = Joi.object({
  name: Joi.string().min(2).max(30).required().messages({
    'string.base': 'Name must be a text string.',
    'string.empty': 'Name is required.',
    'string.min': 'Name must be at least 2 characters.',
    'string.max': 'Name must be at most 30 characters.',
    'any.required': 'Name is required.',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address.',
    'string.empty': 'Email is required.',
    'any.required': 'Email is required.',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters.',
    'string.empty': 'Password is required.',
    'any.required': 'Password is required.',
  }),
  role: Joi.string().valid('user', 'admin').optional().messages({
    'any.only': 'Role must be either "user" or "admin".',
    'string.base': 'Role must be a text value.',
  }),
});

const login = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please enter a valid email address.',
    'string.empty': 'Email is required.',
    'any.required': 'Email is required.',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required.',
    'any.required': 'Password is required.',
  }),
});

const changePassword = Joi.object({
  oldPassword: Joi.string().required().messages({
    'string.empty': 'Current password is required.',
    'any.required': 'Current password is required.',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'New password must be at least 6 characters.',
    'string.empty': 'New password is required.',
    'any.required': 'New password is required.',
  }),
  confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
    'any.only': 'Confirm password must match the new password.',
    'any.required': 'Please confirm your new password.',
  }),
});

const forgotPassword = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Enter a valid email address.',
    'string.empty': 'Email is required.',
    'any.required': 'Email is required.',
  }),
});

const verifyOtp = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid format.',
    'string.empty': 'Email is required.',
    'any.required': 'Email is required.',
  }),
  otp: Joi.string().length(6).required().messages({
    'string.length': 'OTP must be exactly 6 digits.',
    'string.empty': 'OTP is required.',
    'any.required': 'OTP is required.',
  }),
});

const resetPassword = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid address.',
    'string.empty': 'Email is required.',
    'any.required': 'Email is required.',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'New password must be at least 6 characters.',
    'string.empty': 'New password is required.',
    'any.required': 'New password is required.',
  }),
  confirmPassword: Joi.any().valid(Joi.ref('password')).required().messages({
    'any.only': 'Confirm password must match the new password.',
    'any.required': 'Please confirm your new password.',
  }),
});

export const AuthValidation = {
  register,
  login,
  changePassword,
  forgotPassword,
  verifyOtp,
  resetPassword,
};
