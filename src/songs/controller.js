import { SongService } from './service.js';
import { uploadToCloudinaryMulti } from '../utils/resultCloudinary.js';
export const SongController = {
  uploadSingleSong: async (req, res, next) => {
    try {
      const { title, genre, duration, price } = req.body;
      const files = req.files;

      if (!title || !genre || !duration || !files?.audio?.[0]) {
        return res.status(400).json({ success: false, message: 'All required fields must be provided, including an audio file.' });
      }
      const [audioUpload, photoUpload, lyricsUpload] = await Promise.all([
        uploadToCloudinaryMulti(files.audio?.[0].buffer, 'songs/audio'),
        files.photo?.[0] ? uploadToCloudinaryMulti(files.photo[0].buffer, 'songs/covers') : Promise.resolve({ secure_url: '' }),
        files.lyrics?.[0] ? uploadToCloudinaryMulti(files.lyrics[0].buffer, 'songs/lyrics') : Promise.resolve({ secure_url: '' }),
      ]);
      const songData = {
        title,
        genre,
        duration,
        price,
        audio: audioUpload.secure_url,
        photo: photoUpload.secure_url,
        lyrics: lyricsUpload.secure_url,
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
  },

  getAllSongs: async (req, res, next) => {
    try {
      const {songs, totalPages, page } = await SongService.getAllSongs(req.query);
      res.status(200).json({ success: true, data: songs , totalPages: totalPages, currentPage : page   });
    } catch (err) {
      next(err);
    }
  },

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

  getSongById: async (req, res, next) => {
    try {
      const song = await SongService.getSongById(req.params.id);
      res.status(200).json({ success: true, data: song });
    } catch (err) {
      next(err);
    }
  },

  updateSong: async (req, res, next) => {
    try {
        const { title, genre, duration, price } = req.body;
        const files = req.files;

        // Check if the song exists
        const existingSong = await SongService.getSongById(req.params.id);
        if (!existingSong) {
            return res.status(404).json({ success: false, message: 'Song not found.' });
        }

        // Handle file uploads if new files are provided
        const [audioUpload, photoUpload, lyricsUpload] = await Promise.all([
            files?.audio?.[0] ? uploadToCloudinaryMulti(files.audio[0].buffer, 'songs/audio') : Promise.resolve({ secure_url: existingSong.audio }),
            files?.photo?.[0] ? uploadToCloudinaryMulti(files.photo[0].buffer, 'songs/covers') : Promise.resolve({ secure_url: existingSong.photo }),
            files?.lyrics?.[0] ? uploadToCloudinaryMulti(files.lyrics[0].buffer, 'songs/lyrics') : Promise.resolve({ secure_url: existingSong.lyrics }),
        ]);

        // Prepare updated song data
        const updatedSongData = {
            title: title || existingSong.title,
            genre: genre || existingSong.genre,
            duration: duration || existingSong.duration,
            price: price || existingSong.price,
            audio: audioUpload.secure_url,
            photo: photoUpload.secure_url,
            lyrics: lyricsUpload.secure_url,
        };

        // Update the song
        const updatedSong = await SongService.updateSong(req.params.id, updatedSongData);

        res.status(200).json({
            success: true,
            message: 'Song updated successfully.',
            data: updatedSong,
        });
    } catch (err) {
        next(err);
    }
},
  deleteSong: async (req, res, next) => {
    try {
      await SongService.deleteSong(req.params.id);
      res.status(200).json({ success: true, message: 'Song deleted successfully.' });
    } catch (err) {
      next(err);
    }
  },
};
