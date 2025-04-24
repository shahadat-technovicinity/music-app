import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  items: [
    {
      itemId: { type: mongoose.Schema.Types.ObjectId, required: true },
      itemType: { type: String, enum: ['song', 'album'], required: true },
      price: { type: Number, required: true },
      title: {type: String, required: true},
      photo: {type: String}
    }
  ]
});

const Cart = mongoose.model('Cart', cartSchema);
export { Cart };
