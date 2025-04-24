import mongoose from 'mongoose';

const downloadSchema = new mongoose.Schema({
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
      title: { type: String, required: true },
      photo: { type: String },
      downloadedAt: { type: Date, default: Date.now }
    }
  ]
});

const Download = mongoose.model('Download', downloadSchema);
export { Download };
