import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

export const generateAccessToken = (userId: string): string => {
  return jwt.sign({ id: userId }, process.env.JWT_PRIVATE_KEY, {
    algorithm: 'HS256',
    expiresIn: '1h',
  });
};
