import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

let users: User[] = [];

// Initialize users from JSON file
export const initializeUsers = (): void => {
  const filePath = path.join(__dirname, '../data/users.json');
  const data = fs.readFileSync(filePath, 'utf-8');
  users = JSON.parse(data);
};

// Find a user by username
export const findUserByUsername = (username: string): User | undefined => {
  return users.find((user) => user.username === username);
};

// Generate a JWT token
export const generateToken = (user: User): string => {
  const payload = { id: user.id, username: user.username };
  return jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
};
