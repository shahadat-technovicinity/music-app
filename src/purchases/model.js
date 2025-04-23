import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      itemId: mongoose.Schema.Types.ObjectId,
      itemType: { type: String, enum: ['song', 'album'] },
      price: Number,
      title: String,
      photo: String,
      purchasedAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

const Purchase = mongoose.model('Purchase', purchaseSchema);
export { Purchase };
