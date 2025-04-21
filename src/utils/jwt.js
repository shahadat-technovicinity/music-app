import jwt from 'jsonwebtoken';
import { token } from 'morgan';

const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}

const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
}

const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET);
}

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return null;
    }
    return decoded;
  });
}

const AuthUser = async (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return null;
  }
  
  const [bearer, token] = authHeader.split(' ');
  if (bearer !== 'Bearer' || !token) {
    return null;
  }

  try{
    const info = await verifyToken(token);
    return info;
  }catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
  
}

export {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  verifyToken,
  AuthUser
};