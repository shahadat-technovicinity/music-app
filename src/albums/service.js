import { Album } from './model.js';
import { AppError } from '../utils/AppError.js';
import { queryHelper } from '../utils/queryHelper.js';

export const AlbumService = {
  createAlbum: async (albumData) => {
    try {
      const album = new Album(albumData) .populate({
        path: 'songs',
        select: 'title userId' // Only include these fields
      });
      return await album.save();
    } catch (error) {
      throw new AppError(`Error creating album: ${error.message}`, 500);
    }
  },


   // Get album by ID
   getAlbumById: async (id) => {
    try {
      const album = await Album.findById(id)
        .populate('userId', 'name email') // Populate user details
        .populate('songs', 'title duration'); // Populate song details

      if (!album) {
        throw new AppError('Album not found', 404);
      }

      return album;
    } catch (error) {
      throw new AppError(`Error retrieving album: ${error.message}`, 500);
    }
  },

  // Get all albums
  getAllAlbums: async (query) => {
    try {
      const { skip, limit, searchQuery, filterQuery, sortQuery } = queryHelper(query);

      const albums = await Album.find({ ...searchQuery, ...filterQuery })
        .populate('userId', 'name email') // Populate user details
        .populate('songs', 'title duration') // Populate song details
        .sort(sortQuery)
        .skip(skip)
        .limit(limit);

      const count = await Album.countDocuments({ ...searchQuery, ...filterQuery });
      const totalPages = Math.ceil(count / limit);

      return {
        albums,
        totalPages,
        page: parseInt(query.page) || 1,
      };
    } catch (error) {
      throw new AppError(`Error retrieving albums: ${error.message}`, 500);
    }
  },

  editAlbum: async (id,songs, albumData) => {
    try {
      const album = await Album.findById(id);
      if (!album) {
        throw new AppError('Album not found', 404);
      }

        // Handle songs update (merge existing with new ones)
        if (songs) {
            const existingAlbum = await Album.findById(id).select('songs');
            if (!existingAlbum) {
            throw new AppError('Album not found', 404);
            }

            console.log("Existing Album: ", existingAlbum);
            console.log("Songs: ",songs);
            
            // Combine existing and new songs, remove duplicates
            const combinedSongs = [...new Set([
            ...existingAlbum.songs.map(id => id.toString()),
            ...songs
            ])];
            
            albumData.songs = combinedSongs;
        }
         // Update only the fields that are provided in updateData
    Object.keys(albumData).forEach(key => {
        if (albumData[key] !== undefined) {
          album[key] = albumData[key];
        }
      });
  
      await album.save();
      const updatedAlbum =  await Album.find({_id: id}).populate('userId', 'name email') // Populate user details
                                                .populate('songs', 'title duration') // Populate song details
      return updatedAlbum;

    } catch (error) {
      throw new AppError(`Error updating album: ${error.message}`, 500);
    }
  },

  deleteAlbum: async (id) => {
    try {
      const album = await Album.findById(id);
      if (!album) {
        throw new AppError('Album not found', 404);
      }

      await Album.findByIdAndDelete(id);
    } catch (error) {
      throw new AppError(`Error deleting album: ${error.message}`, 500);
    }
  },
};