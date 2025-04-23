import { PostService } from './service.js'; // Assuming PostService exists
import { uploadToCloudinary } from '../utils/resultCloudinary.js'; // Assuming this function exists

const createPost= async (req, res, next) => {
    try {
        const { title, description} = req.body;
        const userId = req.user.id; // Current logged-in user
        if (!title && !description && !req.file) {
        return res.status(400).json({
            success: false,
            message: 'Please provide at least one field to update.'
        });
        }

        const postData = {
            title,
            description
        };

        if (req.file) {
            const fileUrl = await uploadToCloudinary(req);
            postData.photo = fileUrl.secure_url;
        }

        const newPost = await PostService.createPost(userId, postData);

        res.status(201).json({
            success: true,
            message: "Post created successfully.",
            data: newPost,
        });
    } catch (error) {
       next(error); // Pass the error to the error handling middleware
    }
};

const getAllPosts= async (req, res, next) => {
    try {
        const info = new URL(req.url, `http://${req.headers.host}`);
        const searchParams = info.searchParams;
        let page = searchParams.get('page') || 1;
        let limit = searchParams.get('limit') || 12;
    
        const { posts, totalPages } = await PostService.getAllPosts(page, limit);

        if (!posts?.length) {
            return res.status(404).json({ success: false, message: 'No posts found' });
        }

        return res.status(200).json({
        success: true,
        message: 'Posts fetched successfully',
        data: posts,
        totalPages: totalPages,
        currentPage: page
        });
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};

const getPostById= async (req, res, next) => {
    try {
        const { id } = req.params;
        const post = await PostService.getPostById(id);
        res.status(200).json({
            success: true,
            message: "Post retrieved successfully.",
            data: post,
        });
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};

const updatePost= async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description} = req.body;
        if (!title && !description && !req.file) {
        return res.status(400).json({
            success: false,
            message: 'Please provide at least one field to update.'
        });
        }
        const postData = {
            title,
            description
        };
        if (req.file) {
            const fileUrl = await uploadToCloudinary(req);
            postData.photo = fileUrl.secure_url;
        }

        const updatedPost = await PostService.updatePost(id, postData);

        res.status(201).json({
            success: true,
            message: "Post created successfully.",
            data: updatedPost,
        });
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};

const deletePost= async (req, res,next) => {
    try {
        const { id } = req.params;
        await PostService.deletePost(id);
        res.status(200).json({
            success: true,
            message: "Post deleted successfully.",
        });
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};

const likePost= async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const post = await PostService.likePost(id, userId);
        res.status(200).json({
            success: true,
            message: "Post liked successfully.",
            data: post,
        });
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};

const unlikePost= async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const post = await PostService.unlikePost(id, userId);
        res.status(200).json({
            success: true,
            message: "Post unliked successfully.",
            data: post,
        });
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};

const commentOnPost= async (req, res, next) => {
    try {
        const { id } = req.params;
        const { comment } = req.body;
        if (!comment) {
            return res.status(400).json({
                success: false,
                message: 'Comment cannot be empty',
            }); 
        }
        const userId = req.user.id;
        const post = await PostService.addComment(id, userId, comment);
        res.status(201).json({
            success: true,
            message: "Comment added successfully.",
            data: post,
        });
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};

const getAllComments= async (req, res,next) => {
    try {
        const { id } = req.params;
        const post = await PostService.getComments(id);
        res.status(200).json({
            success: true,
            message: "Comments retrieved successfully.",
            data: post.comments,
        });
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};

const sharePost= async (req, res,next) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const post = await PostService.sharePost(id, userId);
        res.status(200).json({
            success: true,
            message: "Post shared successfully.",
            data: post,
        });
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};

export const PostController = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    likePost,
    unlikePost,
    commentOnPost,
    getAllComments,
    sharePost,
};