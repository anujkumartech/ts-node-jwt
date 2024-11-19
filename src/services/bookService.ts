import fs from 'fs';
import path from 'path';

interface Book {
  id: number;
  title: string;
  author: string;
  publishedYear: number;
}

let books: Book[] = [];

// Load books from JSON at server start
export const initializeBooks = (): void => {
  const filePath = path.join(__dirname, '../data/books.json');
  const data = fs.readFileSync(filePath, 'utf-8');
  books = JSON.parse(data);
};

// Get all books
export const getBooks = (): Book[] => {
  return books;
};

// Find a book by ID
export const findBookById = (id: number): Book | undefined => {
  return books.find((b) => b.id === id);
};

// Add a new book
export const addBook = (newBook: Book): void => {
  books.push(newBook);
};

// Delete a book
export const deleteBook = (id: number): void => {
  books = books.filter((b) => b.id !== id);
};

// Save books to JSON (optional, if you want to persist changes)
export const saveBooks = (): void => {
  const filePath = path.join(__dirname, '../data/books.json');
  fs.writeFileSync(filePath, JSON.stringify(books, null, 2));
};