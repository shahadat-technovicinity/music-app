import { AlbumService } from './service.js';
import { uploadToCloudinary } from '../utils/resultCloudinary.js';

export const AlbumController = {
  createAlbum: async (req, res, next) => {
    try {
      const { title, songs,price } = req.body;
      const userId = req.user.id; // Assuming `authMiddleware` adds `user` to `req`
      if(!title && !songs){
        return res.status(400).json({
          success: false,
          message: 'Title and Songs required'
        });
      }
      const albumData = { title, songs,price, userId };
      if(req.file){
        const fileUrl = await uploadToCloudinary(req);
        albumData.photo = fileUrl.secure_url;
      }
      const album = await AlbumService.createAlbum(albumData);

      res.status(201).json({
        success: true,
        message: 'Album created successfully.',
        data: album,
      });
    } catch (error) {
      next(error);
    }
  },

  // Get album by ID
  getAlbum: async (req, res, next) => {
    try {
      const { id } = req.params;

      const album = await AlbumService.getAlbumById(id);

      res.status(200).json({
        success: true,
        message: 'Album retrieved successfully.',
        data: album,
      });
    } catch (error) {
      next(error);
    }
  },

  // Get all albums
  getAllAlbums: async (req, res, next) => {
    try {
      const { albums, totalPages, page } = await AlbumService.getAllAlbums(req.query);

      res.status(200).json({
        success: true,
        message: 'Albums retrieved successfully.',
        data: albums,
        pagination: {
          totalPages,
          currentPage: page,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  editAlbum: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, songs ,price } = req.body;
      const userId = req.user.id; // Assuming `authMiddleware` adds `user` to `req`
      const albumData = { title ,price, userId };
      if(req.file){
        const fileUrl = await uploadToCloudinary(req);
        albumData.photo = fileUrl.secure_url;
      }
      const updatedAlbum = await AlbumService.editAlbum(id,songs, albumData);

      res.status(200).json({
        success: true,
        message: 'Album updated successfully.',
        data: updatedAlbum,
      });
    } catch (error) {
      next(error);
    }
  },

  deleteAlbum: async (req, res, next) => {
    try {
      const { id } = req.params;

      await AlbumService.deleteAlbum(id);

      res.status(200).json({
        success: true,
        message: 'Album deleted successfully.',
      });
    } catch (error) {
      next(error);
    }
  },
};