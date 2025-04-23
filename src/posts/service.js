import { Post } from './model.js';
import {AppError} from '../utils/AppError.js';
import { uploadToCloudinary } from '../utils/resultCloudinary.js';

const createPost = async (userId, postData) => {
    try {
        const post = new Post({ ...postData, userId });
        const savedPost = await post.save();
        return savedPost;
    }
    catch (error) {
        throw new AppError('Error creating post', 500);
    }
};

const getAllPosts = async (page = 1, limit = 12) => {
    try{const skip = (page - 1) * limit;
        const count = await Post.countDocuments({});
        const totalPages = Math.ceil(count / limit);
        const posts = await Post
          .find()
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .populate('userId', 'name email photo');
        return { posts, totalPages };
    }catch (error) {
        throw new AppError('Error fetching posts', 500);
    }
  };

const getPostById = async (id, postData) => {
   try { const post = await Post.findById(id).populate('userId', 'name email photo');
    if (!post) throw new AppError('Post not found', 404);
    return post;
   }
    catch (error) {
          throw new AppError('Error fetching post', 500);
     }
}

const updatePost = async (id, postData) => {
    try {
        let updatedPost = await Post.findByIdAndUpdate(id, postData, { new: true });
        if (!updatedPost) throw new AppError('Post not found', 404);
        updatedPost = await Post.findById(id).populate('userId', 'name email photo');
        return updatedPost;
    }catch (error) {
        throw new AppError('Error updating post', 500);
    }
}

const deletePost = async (id) => {
   try{
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) throw new AppError('Post not found', 404);
   }
    catch (error) {
        throw new AppError('Error deleting post', 500);
    }
}

const likePost = async (postId, userId) => {
    const post = await Post.findById(postId);
    if (!post) throw new AppError('Post not found', 404);
    
    if (post.likes.includes(userId)) {
        throw new AppError('You already liked this post', 400);
    }

    post.likes.push(userId);
    return await post.save();
}

const unlikePost = async (postId, userId) => {
    const post = await Post.findById(postId);
    if (!post) throw new AppError('Post not found', 404);
    
    if (!post.likes.includes(userId)) {
        throw new AppError('You have not liked this post', 400);
    }
    // Remove the userId from the likes array
    post.likes.pull(userId);
    return await post.save();
}

const addComment = async (postId, userId, comment) => {
    const post = await Post.findById(postId);
    if (!post) throw new AppError('Post not found', 404);
    
    post.comments.push({ userId, comment });
    return await post.save();
}

const getComments = async (postId) => {
    const post = await Post.findById(postId).populate('comments.userId', 'name email photo');
    if (!post) throw new AppError('Post not found', 404);
    return post;
}

const sharePost = async (postId, userId) => {
    const post = await Post.findById(postId);
    if (!post) throw new AppError('Post not found', 404);
    
    post.shares.push(userId);
    return await post.save();
}

export const PostService = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    likePost,
    unlikePost,
    addComment,
    getComments,
    sharePost
};