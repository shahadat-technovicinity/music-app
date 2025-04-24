import { Song } from './model.js';
import {AppError} from '../utils/AppError.js';
import { queryHelper } from '../utils/queryHelper.js';
export const SongService = {
    uploadSingleSong: async (songData) => {
        try {
            const song = new Song(songData); // Create a new Song instance with the provided data
            return await song.save(); // Save the song to the database and return it
        } catch (error) {
            throw new AppError(`Error uploading song: ${error.message}`, 500); // Throw an error if something goes wrong
        }
    },
    getAllSongs: async (query) => {
        try {
            const { skip, limit, searchQuery, filterQuery, sortQuery } = queryHelper(query);

            const songs = await Song.find({ ...searchQuery, ...filterQuery })
                .populate('userId', 'name photo')
                .sort(sortQuery)
                .skip(skip)
                .limit(limit);

            const count = await Song.countDocuments({ ...searchQuery, ...filterQuery });
            const totalPages = Math.ceil(count / limit);

            return {
                songs,
                totalPages,
                page: parseInt(query.page) || 1
            };
        } catch (error) {
            throw new AppError(`Error fetching songs: ${error.message}`, 500);
        }
    },
//   getNewReleases: async () => await Song.find().sort({ releaseDate: -1 }).limit(10),
//   getTrendingSongs: async () => await Song.find().sort({ playCount: -1 }).limit(10),
//   getRecommendedSongs: async (userId) => await Song.find({ userId }).limit(10),
    getSongById: async (id) => {
        try{
            const song = await Song.findById(id).populate('userId', 'name');
            if(!song){
                throw new AppError("This song don't found", 404);
            }
            return song;
        }catch(error){
            throw error;
        }
    },
    updateSong: async (id, updates) => {
        try {
            // Check if the song exists
            const song = await Song.findById(id).populate('userId', 'name');
            if (!song) {
                throw new AppError("This song doesn't exist", 404); // 404 Not Found
            }
    
            // Update the song and return the updated document
            const updatedSong = await Song.findByIdAndUpdate(id, updates, { new: true, runValidators: true }).populate('userId', 'name');
            return updatedSong;
        } catch (error) {
            throw new AppError(`Error updating song: ${error.message}`, 500); // 500 Internal Server Error
        }
    },
    deleteSong: async (id) => {
        try{
            const song = await Song.findById(id).populate('userId', 'name');
            if(!song){
                throw new AppError("Song not found", 404);
            }
            await Song.findByIdAndDelete(id);
        }catch(error){
            throw error;
        }
    },
};
