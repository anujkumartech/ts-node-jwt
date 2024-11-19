import { Request, Response } from 'express';
import { findUserByUsername, generateToken } from '../services/userService';

export const loginUser = (req: Request, res: Response): void => {
  const { username, password } = req.body;

  // Check if both username and password are provided
  if (!username || !password) {
    res.status(400).json({ message: 'Username and password are required' });
    return;
  }

  // Find user by username
  const user = findUserByUsername(username);
  if (!user) {
    res.status(401).json({ message: 'Invalid username or password' });
    return;
  }

  // Validate the password
  if (user.password !== password) {
    res.status(401).json({ message: 'Invalid username or password' });
    return;
  }

  // Generate a JWT token
  const token = generateToken(user);
  res.json({ token });
};
