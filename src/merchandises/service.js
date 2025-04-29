import { Merchandise } from './model.js';
import { Size } from '../sizes/model.js';
import { AppError} from "../utils/AppError.js"


const createMerchandise = async (userId, title, price, sizes = []) => {
    try {
      let validSizeIds = [];
  
      // ✅ Validate sizes only if provided
      if (sizes.length > 0) {
        const validSizes = await Size.find({ _id: { $in: sizes } });
        if (validSizes.length !== sizes.length) {
          throw new AppError('One or more size IDs are invalid.', 400);
        }
        validSizeIds = sizes;
      }
  
      const merch = await Merchandise.create({
        user: userId,
        title,
        price,
        sizes: validSizeIds
      });
  
      return await merch.populate('sizes'); // ✅ Populate size info (e.g. label)
    } catch (error) {
      throw error;
    }
}

export const MerchandiseService = {createMerchandise}