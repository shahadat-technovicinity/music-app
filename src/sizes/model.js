import mongoose from 'mongoose';

const sizeSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
  displayOrder: Number,
}, { timestamps: true });

export const Size = mongoose.model('Size', sizeSchema);
