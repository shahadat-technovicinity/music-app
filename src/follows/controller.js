import { FollowService } from './service.js';

const followUser = async (req, res, next) => {
    try {
        const { id: followingId } = req.params; // User to follow
        const followerId = req.user.id; // Current logged-in user
    
        if (followerId.toString() === followingId) {
            return res.status(400).json({
                success: false,
                message: "You cannot follow yourself."
            })
        }
        
        const follow = await FollowService.createFollow(followerId, followingId);
       
        res.status(200).json({
            success: true,
            message: "User followed successfully.",
            data: follow
        });
       } catch (error) {
            next(error); // Pass the error to the error handling middleware
        }
};
const unfollowUser = async (req, res,next) => {
   try{
    const { id: followingId } = req.params; // User to unfollow
    const followerId = req.user.id; // Current logged-in user
    const follow = await FollowService.deleteFollow(followerId, followingId);
    res.status(200).json({
        success: true,
        message: "User unfollowed successfully.",
        data: follow
    });
   }catch (error) {
       next(error); // Pass the error to the error handling middleware
    }
};

const getFollowers = async (req, res,next) => {
    try{
        const info = new URL(req.url, `http://${req.headers.host}`);
        const searchParams = info.searchParams;
        let page = searchParams.get('page') || 1;
        let limit = searchParams.get('limit') || 12;
       
        const userId = req.user.id; // Current logged-in user
        const {followers, totalPages} = await FollowService.getFollowers(userId, page, limit);
        res.status(200).json({
            success: true,
            message: "Followers retrieved successfully.",
            data: followers,
            totalPages: totalPages,
            currentPage: page

        })
    }catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};

const getFollowings = async (req, res, next) => {
    try{

        const info = new URL(req.url, `http://${req.headers.host}`);
        const searchParams = info.searchParams;
        let page = searchParams.get('page') || 1;
        let limit = searchParams.get('limit') || 12;
        const userId = req.user.id; // Current logged-in user
        const {followings, totalPages} = await FollowService.getFollowings(userId, page, limit);
        res.status(200).json({
            success: true,
            message: "Followings retrieved successfully.",
            data: followings,
            totalPages: totalPages,
            currentPage: page

        })
    }catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};

export const FollowController = {
    followUser,
    unfollowUser,
    getFollowers,
    getFollowings
};