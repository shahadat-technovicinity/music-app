import { Follow } from './model.js';
import {AppError} from '../utils/AppError.js';
import { User } from '../users/model.js';

const createFollow = async (followerId, followingId) => {
    try {

        // check following id
        const followingUser = await User.findById(followingId);
        if (!followingUser) {
            throw new AppError("Following not found", 404); // 404 Not Found
        }

        const existingFollow = await Follow.findOne({ follower: followerId, following: followingId });
        if (existingFollow) {
            throw new AppError("You are already following this user", 400); // 400 Bad Request
        }
        const follow = new Follow({
            follower: followerId,
            following: followingId,
        });
        await follow.save();
        return follow;
    } catch (error) {
        throw error; // Pass the error to the controller
    }
};

const deleteFollow = async (followerId, followingId) => {
    try {
        const follow = await Follow.findOneAndDelete({ follower: followerId, following: followingId });
        if (!follow) {
            throw new AppError("You are not following this user", 404); // 404 Not Found
        }
        return follow;
    } catch (error) {
        throw error; // Pass the error to the controller
    }
}

const getFollowers = async (userId, page=1,limit=12) => {
    try {
        const skip = (page - 1) * limit;
        const count = await Follow.countDocuments({ follower: userId });
        const totalPages = Math.ceil(count / limit);
        const followers = await Follow.find({ follower: userId }).populate('following', 'name email photo');
        return { followers, totalPages };
    } catch (error) {
        throw error; // Pass the error to the controller
    }
};

const getFollowings  = async (userId, page=1,limit=12) => {
    try {
        const skip = (page - 1) * limit;
        const count = await Follow.countDocuments({ following: userId });
        const totalPages = Math.ceil(count / limit);
        const followings = await Follow.find({ following: userId }).populate('follower', 'name email photo');
        return { followings, totalPages };
    } catch (error) {
        throw error; // Pass the error to the controller
    }
};
export const FollowService = {
    createFollow,
    deleteFollow,
    getFollowers,
    getFollowings
};