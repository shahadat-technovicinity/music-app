import { SongService } from './service.js';
import { uploadToCloudinary } from '../utils/resultCloudinary.js';
export const SongController = {
  uploadSingleSong: async (req, res, next) => {
    try {
      const { title, genre, duration, price } = req.body;
      const files = req.files;
  
      if (!title || !genre || !duration || !files?.audio?.[0]) {
        return res.status(400).json({ success: false, message: 'All required fields must be provided, including an audio file.' });
      }
  
      const audioFile = files.audio[0];
      const photoFile = files.photo?.[0];

      console.log("Req.Body: ", req.body);
      console.log("AudioFIle", audioFile);
      console.log("PhotoFile", photoFile);
  
      const [audioUpload, photoUpload] = await Promise.all([
        uploadToCloudinary(audioFile.buffer, 'songs/audio'),
        photoFile ? uploadToCloudinary(photoFile.buffer, 'songs/covers') : Promise.resolve({ secure_url: '' }),
      ]);
  
      console.log("Audio Secure Url: ", audioUpload.secure_url);
      console.log("Photo Secure Url: ", photoUpload.secure_url);


      const songData = {
        title,
        genre,
        duration,
        price,
        audio: audioUpload.secure_url,
        photo: photoUpload.secure_url,
        artist: req.user.id,
        userId: req.user.id,
      };

      console.log("SongData: ", songData);
  
      const song = await SongService.uploadSingleSong(songData);
  
      res.status(201).json({
        success: true,
        message: 'Song uploaded successfully.',
        data: song,
      });
    } catch (err) {
      next(err);
    }
  }

  // getAllSongs: async (req, res, next) => {
  //   try {
  //     const songs = await SongService.getAllSongs();
  //     res.status(200).json({ success: true, data: songs });
  //   } catch (err) {
  //     next(err);
  //   }
  // },

  // getNewReleases: async (req, res, next) => {
  //   try {
  //     const songs = await SongService.getNewReleases();
  //     res.status(200).json({ success: true, data: songs });
  //   } catch (err) {
  //     next(err);
  //   }
  // },

  // getTrendingSongs: async (req, res, next) => {
  //   try {
  //     const songs = await SongService.getTrendingSongs();
  //     res.status(200).json({ success: true, data: songs });
  //   } catch (err) {
  //     next(err);
  //   }
  // },

  // getRecommendedSongs: async (req, res, next) => {
  //   try {
  //     const songs = await SongService.getRecommendedSongs(req.user.id);
  //     res.status(200).json({ success: true, data: songs });
  //   } catch (err) {
  //     next(err);
  //   }
  // },

  // getSongById: async (req, res, next) => {
  //   try {
  //     const song = await SongService.getSongById(req.params.id);
  //     res.status(200).json({ success: true, data: song });
  //   } catch (err) {
  //     next(err);
  //   }
  // },

  // updateSong: async (req, res, next) => {
  //   try {
  //     const song = await SongService.updateSong(req.params.id, req.body);
  //     res.status(200).json({ success: true, message: 'Song updated.', data: song });
  //   } catch (err) {
  //     next(err);
  //   }
  // },

  // deleteSong: async (req, res, next) => {
  //   try {
  //     await SongService.deleteSong(req.params.id);
  //     res.status(200).json({ success: true, message: 'Song deleted.' });
  //   } catch (err) {
  //     next(err);
  //   }
  // },
};
