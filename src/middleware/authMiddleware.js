import jwt from 'jsonwebtoken';
import {User} from '../users/model.js';

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({
        success: false,
        message: 'No token provided, authorization denied'
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
        return res.status(401).json({
            success: false,
            message: 'User not found'
        });
    }

    if (user.currentToken !== token) {
        return res.status(401).json({
            success: false,
            message: 'Token is not valid'
        });
    }

    req.user = { id: user._id };
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    return res.status(401).json({
        success: false,
        message: 'Token is not valid'
    });
  }
};

export { authMiddleware };