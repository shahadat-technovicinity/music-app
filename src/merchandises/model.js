import mongoose from 'mongoose';

const merchandiseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['clothing', 'accessories', 'music', 'other'],
    default: 'other'
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Merchandise = mongoose.model('Merchandise', merchandiseSchema);
export { Merchandise };