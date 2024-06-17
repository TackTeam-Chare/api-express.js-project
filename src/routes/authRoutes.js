import express from 'express';
import AuthController from '../controllers/AuthController.js';
import AuthCreate from '../controllers/AuthCreate.js';

const router = express.Router();

// Route for login
router.post('/login', AuthController.login);

// Route for admin registration
router.post('/register', AuthCreate.createAdmin);

export default router;
