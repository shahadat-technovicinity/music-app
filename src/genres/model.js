import mongoose from 'mongoose';

const genreSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Genre = mongoose.model('Genre', genreSchema);
export { Genre };