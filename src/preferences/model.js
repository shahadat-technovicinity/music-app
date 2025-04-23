import mongoose from 'mongoose';

const preferenceSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Preference = mongoose.model('Preference', preferenceSchema);
export { Preference };