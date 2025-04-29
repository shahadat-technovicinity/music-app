import {Size} from './model.js';


const getAllSizes = async (req, res,next) => {
  try {
    const sizes = await Size.find().sort({ displayOrder: 1 });
    res.status(200).json({success: true, message: "Sizes fetched successfully", data: sizes});
  } catch (err) {
    next(err);
  }
};

const addSize = async (req, res,next) => {
  const { label, displayOrder } = req.body;
  console.log("req.body: ", req.body);

  if (!label) {
    return res.status(400).json({ success: false, message: 'Label is required.' });
  }

  try {
    const exists = await Size.findOne({ label });
    if (exists) {
      return res.status(400).json({  success: false, message: 'Size already exists.' });
    }

    const newSize = await Size.create({ label, displayOrder });
    res.status(201).json({
        success: true,
        message: "Size is created",
        data: newSize
    });
  } catch (err) {
    next(err);
  }
};

const updateSize = async (req, res) => {
  const { label, displayOrder } = req.body;

  if (!label && displayOrder === undefined) {
    return res.status(400).json({
      success: false,
      message: 'Please provide at least one field to update.'
    });
  }

  try {
    const updated = await Size.findByIdAndUpdate(
      req.params.id,
      { label, displayOrder },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success:false, message: 'Size not found.' });
    }

    res.status(200).json({success: true, message: "Size updated Successfully", data: updated});
  } catch (err) {
    next(err);
  }
};

const deleteSize = async (req, res) => {
  try {
    const deleted = await Size.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success:false,message: 'Size not found.' });
    }

    res.status(200).json({ success: true, message: 'Size deleted successfully.' });
  } catch (err) {
    next(err);
  }
};


export const SizeController = {getAllSizes, addSize, updateSize ,deleteSize};