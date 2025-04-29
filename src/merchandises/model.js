import mongoose from 'mongoose';

const merchandiseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  sizes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Size' }],
  images: [{ type: String }]
}, { timestamps: true });

export const Merchandise=  mongoose.model('Merchandise', merchandiseSchema);
