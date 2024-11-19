import { Router } from 'express';
import { getAllBooks, getBookById, addNewBook, removeBook } from '../controllers/bookController';
import { loginUser } from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// User login
router.post('/login', loginUser);

router.use('/books', authMiddleware);

// Book routes (protected)
router.get('/books', authMiddleware, getAllBooks);
router.get('/books/:id', authMiddleware, getBookById);
router.post('/books', authMiddleware, addNewBook);
router.delete('/books/:id', authMiddleware, removeBook);

export default router;
