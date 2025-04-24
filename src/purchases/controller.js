import Stripe from 'stripe';
import { PurchaseService } from './service.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_51R4IhDKp6PZHwfZsyytSoYpC3BvSErCXjMykC8jiZjJ3XbIrudGe8OgNN6Yf7tWi6xTaRJme4fyGw9s19iVD34ks00kxT6HmLf');


const addToCart = async (req, res, next) => {
  try {
    const data = await PurchaseService.addToCart(req.user.id, req.body);
    res.status(200).json({ success: true, message: 'Item add to Cart', data:data });
  } catch (err) {
    next(err);
  }
};

const getCart = async (req, res, next) => {
  try {
    const cart = await PurchaseService.getCart(req.user.id);
    res.status(200).json({ success: true, message: 'Retrived all items from cart' , data: cart });
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
    res.status(200).send(
    {
        success:true,
        message:"stripe payment",
        data:session
    }
  )
  } catch (err) {
    next(err);
  }
};

const paymentSuccess = async (req, res, next) => {
  try {
    const sessionId = req.params.sessionId;
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (session.payment_status !== 'paid') {
      return res.status(400).json({ success: false, message: "Payment not completed" });
    }

    const userId = session.metadata?.userId;
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID missing in metadata" });
    }

    const downloadItems = PurchaseService.paymentSuccess(userId);

    res.status(200).json({
      success: true,
      data: downloadItems,
      message: "Cart items added to downloads",
    });
  } catch (err) {
    console.error("Payment Success Error:", err.message);
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
  removeFromCart,
  paymentSuccess
};
