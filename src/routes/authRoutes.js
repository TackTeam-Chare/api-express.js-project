import express from 'express';
import AuthController from '../controllers/AuthController.js';


const router = express.Router();

//for Login
router.post('/login', AuthController.login);

//for admin Registration
router.post('/register', AuthController.createAdmin);

export default router;
