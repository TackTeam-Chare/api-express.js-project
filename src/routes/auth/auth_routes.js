import express from 'express';
import AuthController from '../../controllers/auth/AuthController.js';
import authenticateJWT from '../../middleware/authMiddleware.js';
const router = express.Router();


// Admin
router.post('/login', AuthController.login); // ไม่ใช้ token
router.post('/register', AuthController.createAdmin); // ไม่ใช้ token
router.post('/logout', authenticateJWT,AuthController.logout); // logout 
router.get('/profile',authenticateJWT, AuthController.getProfile); // getByToken
router.put('/profile',authenticateJWT, AuthController.updateProfile); // update by token
router.get('/admin',authenticateJWT, AuthController.getAllAdmins); // getAllFetch Admin
router.get('/admin/:id',authenticateJWT, AuthController.getAdminById); // get by id
router.put('/admin/:id',authenticateJWT, AuthController.updateAdmin); // update by id
router.delete('/admin/:id',authenticateJWT, AuthController.deleteAdmin); //delete by id

export default router;
