import { UserService } from './service.js';
import { uploadToCloudinary } from '../utils/resultCloudinary.js';

const getAllUsers = async (req, res) => {
  try {
    const info = new URL(req.url, `http://${req.headers.host}`);
    const searchParams = info.searchParams;
    let page = searchParams.get('page') || 1;
    let limit = searchParams.get('limit') || 12;
  
    const { users, totalPages } = await UserService.getAllUsers(page, limit);

    if (!users.length) {
      return res.status(404).json({ success: false, message: 'No users found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Users fetched successfully',
      data: users,
      totalPages: totalPages,
      currentPage: page
    });

  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await UserService.getUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    return res.status(200).json({ success: true, message:"User retrive Successfully" ,data: user });
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, first_name, last_name, bio } = req.body;

    if (!name && !first_name && !last_name && !bio && !req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please provide at least one field to update.'
      });
    }


    const updateFields = {};
    if (name) updateFields.name = name;
    if (first_name) updateFields.first_name = first_name;
    if (last_name) updateFields.last_name = last_name;
    if (bio) updateFields.bio = bio;

    if (req.file) {
      const fileUrl = await uploadToCloudinary(req);
      updateFields.photo = fileUrl.secure_url;
    }
    const updatedUser = await UserService.updateUser(req.user.id, updateFields);

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'User updated successfully.',
      data: updatedUser
    });

  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const UserController = {
  getAllUsers,
  getUserById,
  updateUser
};
