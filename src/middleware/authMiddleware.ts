import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.split(' ')[1]; // Expecting 'Bearer <token>'
  if (!token) {
    res.status(401).json({ message: 'Access Denied. No token provided.' });
    return;
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET || 'secret');
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};
