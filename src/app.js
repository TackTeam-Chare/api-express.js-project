import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import touristRoutes from './routes/user/tourism_routes.js';
import SeasonRoutes from './routes/user/season_router.js';
import CategoryRoutes from './routes/user/category_router.js';
import DistrictRoutes from './routes/user/district_router.js';
import TimeRoutes from './routes/user/time_router.js';
import adminRoutes from './routes/auth/admin_routes.js';
import pool from './config/db.js';
import authRoutes from './routes/auth/auth_routes.js';
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
app.use('/', touristRoutes);

// Routes for Season
app.use('/', SeasonRoutes);

// Routes for Category
app.use('/', CategoryRoutes);

// Routes for District
app.use('/', DistrictRoutes);

// Routes for Time
app.use('/', TimeRoutes);

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
