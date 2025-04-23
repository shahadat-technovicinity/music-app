import { User } from './model.js';
import { uploadToCloudinary } from '../utils/resultCloudinary.js';

const getAllUsers = async (page = 1, limit = 12) => {
  const skip = (page - 1) * limit;
  const count = await User.countDocuments({});
  const totalPages = Math.ceil(count / limit);
  const users = await User
    .find({}, { currentToken: 0, password: 0 })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
  return { users, totalPages };
};

const getUserById = async (userId) => {
  return await User.findById(userId, { currentToken: 0, password: 0 });
};

const updateUser = async (userId, updateFields) => {
  return await User.findByIdAndUpdate(userId, updateFields, {
    new: true,
    runValidators: true
  }).select({ currentToken: 0, password: 0 });
};

export const UserService = {
  getAllUsers,
  getUserById,
  updateUser,
};
