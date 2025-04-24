import Stripe from 'stripe';
import { Cart } from '../carts/model.js';
import { Download } from '../downloads/model.js';
import { Purchase } from './model.js';
import { Song } from '../songs/model.js';
import { Album } from '../albums/model.js';
import {AppError} from '../utils/AppError.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_51R4IhDKp6PZHwfZsyytSoYpC3BvSErCXjMykC8jiZjJ3XbIrudGe8OgNN6Yf7tWi6xTaRJme4fyGw9s19iVD34ks00kxT6HmLf');

const addToCart = async (userId, { itemId, itemType }) => {
  let item;
  if (itemType === 'song') item = await Song.findById(itemId);
  else item = await Album.findById(itemId);
  if (!item) throw new AppError('Item not found', 404);

  const cart = await Cart.findOneAndUpdate(
    { userId },
    {
      $addToSet: {
        items: {
          itemId,
          itemType,
          price: item.price || 0,
          title: item.title || itemId,
          photo: item.photo || itemId,
        }
      }
    },
    { upsert: true, new: true }
  );

  return cart;
};

const getCart = async (userId) => {
  return await Cart.findOne({ userId });
};

const createStripeSession = async (userId) => {
  const cart = await Cart.findOne({ userId });
  if (!cart || cart.items.length === 0) throw new AppError('Cart is empty', 404);

  const lineItems = cart.items.map((item) => ({
    price_data: {
        currency: 'usd',
    //   product_data: { name: `${item.itemType.toUpperCase()}: ${item.title}` },
        product_data: {
            name: `${item.title}`,
            description: `${item.itemType}`,
            images: [item.photo], // ✅ Add image URL here
        },
        unit_amount: item.price * 100,
    },
    quantity: 1,
  }));
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    metadata: {
        userId: userId.toString() // ✅ Must be string
    },
    success_url: `${process.env.CLIENT_URL}/success`,
    cancel_url: `${process.env.CLIENT_URL}/cancel`,
  });

  return session;
};

const getDownloadUrl = async (userId, itemId) => {
  const purchase = await Purchase.findOne({ userId, 'items.itemId': itemId });
  if (!purchase) throw new Error('Item not purchased');

  const song = await Song.findById(itemId);
  const album = await Album.findById(itemId);
  const item = song || album;

  if (!item) throw new Error('Item not found');
  return item.audioUrl || item.coverImage || item.lyricsUrl;
};

const removeFromCart = async (userId, itemId) => {
    let cart = await Cart.findOne({
        userId,
        'items.itemId': itemId
    });
    if(!cart){
        throw new AppError("Item not found", 404);
    }
    cart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { items: { itemId } } },
      { new: true }
    );
    return cart;
};

const paymentSuccess = async (userId) => {
  const cart = await Cart.findOne({ userId });
  if (!cart || cart.items.length === 0) {
    throw new AppError("Cart is empty", 404);
  }
  const existingDownload = await Download.findOne({ userId });
  if (existingDownload) {
    existingDownload.items.push(...cart.items);
    await existingDownload.save();
  } else {
    await Download.create({
      userId,
      items: cart.items
    });
  }
  await Cart.deleteOne({ userId }); 
  return existingDownload;
};

export const PurchaseService = {
  addToCart,
  getCart,
  createStripeSession,
  getDownloadUrl,
  removeFromCart,
  paymentSuccess
};
