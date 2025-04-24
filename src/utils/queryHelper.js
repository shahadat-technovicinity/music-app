export const queryHelper = (query) => {
    const { page = 1, limit = 10, search, sort, genre, userId } = query;

    // Pagination
    const skip = (page - 1) * limit;

    // Search
    const searchQuery = search
        ? {
              $or: [
                  { title: { $regex: search, $options: 'i' } }, // Case-insensitive search for title
                  { genre: { $regex: search, $options: 'i' } }, // Case-insensitive search for genre
              ],
          }
        : {};

    // Filters
    const filterQuery = {};
    if (genre) filterQuery.genre = genre; // Filter by genre
    if (userId) filterQuery.userId = userId; // Filter by userId ID

    // Sorting
    const sortQuery = {};
    if (sort) {
        const [field, order] = sort.split(':'); // Example: sort=releaseDate:desc
        sortQuery[field] = order === 'oldest' ? 1 : -1; // oldest, latest
        // sortQuery[releaseDate] = sort === 'oldest' ? 1 : -1;
    }

    return {
        skip,
        limit: parseInt(limit),
        searchQuery,
        filterQuery,
        sortQuery,
    };
};

// http://localhost:3000/songs?page=2&limit=5&search=rock&genre=pop&sort=releaseDate:desc