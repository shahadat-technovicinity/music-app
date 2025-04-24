import { Download } from './model.js';
import { queryHelper } from '../utils/queryHelper.js'; // assumes this exists
import { AppError } from '../utils/appError.js'; // your custom error handler

const getDownloadsByUser = async (userId, query) => {
  try {
    const { skip, limit, searchQuery, filterQuery, sortQuery } = queryHelper(query);

    const downloadDoc = await Download.findOne({ userId });

    if (!downloadDoc || !downloadDoc.items.length) {
      return {
        downloads: [],
        totalPages: 0,
        page: parseInt(query.page) || 1
      };
    }

    // Filter and search (basic match on title, type)
    let filtered = downloadDoc.items;

    if (searchQuery.title) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchQuery.title.toLowerCase())
      );
    }

    if (filterQuery.itemType) {
      filtered = filtered.filter(item => item.itemType === filterQuery.itemType);
    }

    // Sort
    if (sortQuery && sortQuery.downloadedAt) {
      filtered.sort((a, b) => {
        return sortQuery.downloadedAt === 1
          ? new Date(a.downloadedAt) - new Date(b.downloadedAt)
          : new Date(b.downloadedAt) - new Date(a.downloadedAt);
      });
    }

    // Pagination
    const page = parseInt(query.page) || 1;
    const start = skip;
    const end = skip + limit;
    const paginated = filtered.slice(start, end);
    const totalPages = Math.ceil(filtered.length / limit);

    return {
      downloads: paginated,
      totalPages,
      page
    };
  } catch (error) {
    throw new AppError(`Error fetching downloads: ${error.message}`, 500);
  }
};

export const DownloadService = {
    getDownloadsByUser
}