import mongoose from 'mongoose';
const { Schema } = mongoose;

const songSchema = new Schema({
  title: { type: String, required: true },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  album: { type: mongoose.Schema.Types.ObjectId, ref: 'Album', default: null },
  photo: { type: String, required: true },
  audio: { type: String, required: true },
  genre: { type: String, required: true },
  duration: { type: Number, required: true },
  releaseDate: { type: Date, default: Date.now },
  playCount: { type: Number, default: 0 },
  price: { type: Number, default: 0 }, // NEW: Price for individual song
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Song = mongoose.model('Song', songSchema);
export { Song };