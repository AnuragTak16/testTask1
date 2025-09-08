import express from 'express';
import DatabaseConnection from './Database/db.js';

const app = express();
const PORT = 3000;

// Database connection
DatabaseConnection();

app.use(express.json());

app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});
