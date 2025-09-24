// SECTION - This code is written to create authentication middleware for an Express application using JWT (JSON Web Tokens).

import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../../models/user/User.js';
import { AuthTokenPayload } from '../../types/types.js';

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
}

export const authenticateToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    if (!token) return void res.status(401).json({ success: false, message: 'Access token missing' });

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET is not defined in environment variables');

    const decoded = jwt.verify(token, secret) as AuthTokenPayload;
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) return void res.status(401).json({ success: false, message: 'User not found' });

    req.user = { userId: decoded.userId, email: decoded.email };
    return next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError)
      return void res.status(401).json({ success: false, message: 'Invalid token' });
    console.error('Auth middleware error:', error);
    return void res.status(500).json({ success: false, message: 'Authentication error' });
  }
};

export const optionalAuth = async (req: AuthenticatedRequest, _: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return next();

    const secret = process.env.JWT_SECRET;
    if (!secret) return next();

    const decoded = jwt.verify(token, secret) as AuthTokenPayload;
    const user = await User.findById(decoded.userId).select('-password');

    if (user) req.user = { userId: decoded.userId, email: decoded.email };
    return next();
  } catch (error) {
    console.error('Optional auth middleware error:', error);
    return next();
  }
};
