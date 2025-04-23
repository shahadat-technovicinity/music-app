// filepath: c:\Users\USER\Desktop\shahadat_techno\music-app\src\follows\model.js
import mongoose from 'mongoose';

const followSchema = new mongoose.Schema({
    follower: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // The user who is following
    following: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // The user being followed
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Follow = mongoose.model('Follow', followSchema);
export { Follow };