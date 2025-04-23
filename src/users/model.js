//user model
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'musician'],
        default: 'user',
    },
    forget_password_otp: {
        type: String,
        default: null,
    },
    forget_password_otp_expiry: {
        type: Date,
        default: null,
    },
    photo: {
        type: String // URL to profile picture
    },
    bio: {
        type: String // Short biography or description
    },
    genres: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Genre'
        }
    ],
    currentToken: {
        type: String
    },      
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

const User = mongoose.model('User', userSchema);
export {User};