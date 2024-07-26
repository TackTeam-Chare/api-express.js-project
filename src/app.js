import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import userRoutes from './routes/user/userRoutes.js';
import adminRoutes from './routes/auth/adminRoutes.js';
import pool from './config/db.js';
import authRoutes from './routes/auth/authRoutes.js';
import authenticateJWT from './middleware/authMiddleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Define __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// User
app.use('/', userRoutes);



// Admin
app.use('/auth', authRoutes);
app.use('/admin', authenticateJWT, adminRoutes);

pool.getConnection()
  .then(conn => {
    console.log('Database connection established');
    conn.release();
  })
  .catch(err => {
    console.error('Database connection failed', err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
