import { MerchandiseService } from "./service.js";

const createMerchandise = async (req, res, next) => {
  const { title, price, sizes} = req.body;
  const userId = req.user.id;
  console.log("Photos: ", req.files);

  if (!title || !price) {
    return res.status(400).json({ error: 'Title, price, and sizes (as array of size IDs) are required.' });
  }

  try {
    const product = await MerchandiseService.createMerchandise(userId,title,price,sizes);
    res.status(201).json({
      success: true,
      message: "New product created successfully",
      data: product
    })
  } catch (err) {
    next(err);
  }
};

// export const getAllMerchandise = async (req, res) => {
//   try {
//     const merch = await Merchandise.find().populate('sizes'); // Populates full size objects
//     res.json(merch);
//   } catch (err) {
//     res.status(500).json({ error: 'Error fetching merchandise' });
//   }
// };


export const MerchandiseController = {
  createMerchandise
}
