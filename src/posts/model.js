import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User who created the post
    title: { type: String, required: true },
    photo: { type: String },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users who liked the post
    comments: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            comment: { type: String, required: true },
            createdAt: { type: Date, default: Date.now }
        }
    ],
    shares: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users who shared the post
});

const Post = mongoose.model('Post', postSchema);
export  {Post};