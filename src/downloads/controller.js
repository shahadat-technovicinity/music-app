import { DownloadService } from './service.js';

const getUserDownloads = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const {downloads, totalPages, page } = await DownloadService.getDownloadsByUser(userId,req.query);
    return res.status(200).json({
      success: true,
      message: 'User downloads fetched successfully',
      data: downloads,
      totalPages: totalPages,
      page: page
    });
  } catch (error) {
    console.error('Error fetching downloads:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch downloads',
      error: error.message
    });
  }
};

export const DownloadController=  {getUserDownloads,}