import { Song } from './model.js';

export const SongService = {
    uploadSingleSong: async (songData) => {
        try {
            const song = new Song(songData); // Create a new Song instance with the provided data
            return await song.save(); // Save the song to the database and return it
        } catch (error) {
            throw new Error(`Error uploading song: ${error.message}`); // Throw an error if something goes wrong
        }
    },

//   getAllSongs: async () => await Song.find().populate('artist', 'name'),
//   getNewReleases: async () => await Song.find().sort({ releaseDate: -1 }).limit(10),
//   getTrendingSongs: async () => await Song.find().sort({ playCount: -1 }).limit(10),
//   getRecommendedSongs: async (userId) => await Song.find({ userId }).limit(10),
//   getSongById: async (id) => await Song.findById(id).populate('artist', 'name'),
//   updateSong: async (id, updates) => await Song.findByIdAndUpdate(id, updates, { new: true }),
//   deleteSong: async (id) => await Song.findByIdAndDelete(id),
};
