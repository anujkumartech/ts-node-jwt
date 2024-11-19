import express from 'express';
import dotenv from 'dotenv';
import router from './routes';
import { initializeBooks } from './services/bookService';
import { initializeUsers } from './services/userService';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize in-memory data
initializeBooks();
initializeUsers();

app.use(express.json()); // Middleware to parse JSON
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
