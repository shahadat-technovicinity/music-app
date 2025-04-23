import {Merchandise} from './model.js';

const MerchandiseController = {
// Get featured merchandise
getFeaturedMerchandise: async (req, res) => {
  try {
    const merchandise = await Merchandise.find()
      .populate('artist', 'name')
      .limit(3);
    res.status(200).json(merchandise);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
},
// Get all merchandise
getAllMerchandise: async (req, res) => {
  try {
    const merchandise = await Merchandise.find()
      .populate('artist', 'name');
    res.status(200).json(merchandise);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
},
};

export { MerchandiseController };