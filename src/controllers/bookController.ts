import { Request, Response } from 'express';
import { getBooks, findBookById, addBook, deleteBook } from '../services/bookService';

// Fetch all books
export const getAllBooks = (req: Request, res: Response): void => {
  const books = getBooks();
  res.json(books);
};

// Fetch book by ID
export const getBookById = (req: Request, res: Response): void => {
  const bookId = parseInt(req.params.id);

  if (isNaN(bookId)) {
    res.status(400).json({ message: 'Invalid book ID' });
    return;
  }

  const book = findBookById(bookId);
  if (!book) {
    res.status(404).json({ message: 'Book not found' });
    return;
  }

  res.json(book);
};

// Add a new book
export const addNewBook = (req: Request, res: Response): void => {
  const { title, author, publishedYear } = req.body;

  if (!title || !author || !publishedYear) {
    res.status(400).json({ message: 'Missing required fields' });
    return;
  }

  const newBook = {
    id: Date.now(), // Generate a unique ID
    title,
    author,
    publishedYear
  };

  addBook(newBook);
  res.status(201).json(newBook);
};

// Delete a book
export const removeBook = (req: Request, res: Response): void => {
  const bookId = parseInt(req.params.id);

  if (isNaN(bookId)) {
    res.status(400).json({ message: 'Invalid book ID' });
    return;
  }

  const book = findBookById(bookId);
  if (!book) {
    res.status(404).json({ message: 'Book not found' });
    return;
  }

  deleteBook(bookId);
  res.status(200).json({ message: 'Book deleted successfully' });
};
