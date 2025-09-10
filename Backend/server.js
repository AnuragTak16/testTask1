import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import DatabaseConnection from './database/db.js';
import userRoutes from './routes/userroute.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
// Connect to DB
DatabaseConnection();

app.use(express.json());
app.use(cors());

// Routes
app.use('/api', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
