import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import touristEntityRoutes from './routes/touristEntityRoutes.js';
import adminRoutes from './routes/adminRoutes.js'; 
import pool from './config/db.js';  
import authRoutes from './routes/authRoutes.js';
import authenticateJWT from './middleware/authMiddleware.js'; 
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

app.use('/', touristEntityRoutes);
// app.use('/admin', adminRoutes);

app.use('/auth', authRoutes);
app.use('/admin', authenticateJWT, adminRoutes);
app.use('/', touristEntityRoutes);

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
