import { PurchaseService } from './service.js';

const addToCart = async (req, res, next) => {
  try {
    const data = await PurchaseService.addToCart(req.user.id, req.body);
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

const getCart = async (req, res, next) => {
  try {
    const cart = await PurchaseService.getCart(req.user.id);
    res.status(200).json({ success: true, data: cart });
  } catch (err) {
    next(err);
  }
};

const removeFromCart = async (req, res, next) => {
    try {
      const itemId = req.params.itemId;
      const result = await PurchaseService.removeFromCart(req.user.id, itemId);
      res.status(200).json({ success: true, message: 'Item removed from cart', data: result });
    } catch (err) {
      next(err);
    }
  };
  
const checkout = async (req, res, next) => {
  try {
    const session = await PurchaseService.createStripeSession(req.user.id);
    res.status(200).json({ success: true, url: session.url });
  } catch (err) {
    next(err);
  }
};


const downloadItem = async (req, res, next) => {
  try {
    const url = await PurchaseService.getDownloadUrl(req.user.id, req.params.id);
    res.status(200).json({ success: true, downloadUrl: url });
  } catch (err) {
    next(err);
  }
};

export const PurchaseController = {
  addToCart,
  getCart,
  checkout,
  downloadItem,
  removeFromCart
};
