import {Album} from './model.js';

const AlbumController = {
// Get all albums
getAllAlbums: async (req, res) => {
  try {
    const albums = await Album.find()
      .populate('artist', 'name')
      .populate('songs');
    res.status(200).json(albums);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
},
};

export { AlbumController };