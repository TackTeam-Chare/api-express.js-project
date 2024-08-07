import express from 'express';
import AuthController from '../../controllers/auth/AuthController.js';
import authenticateJWT from '../../middleware/authMiddleware.js';
const router = express.Router();



// Admin
router.post('/login', AuthController.loginHandler); // ไม่ใช้ token
router.post('/register', AuthController.createAdminHandler); // ไม่ใช้ token

router.put('/admin/post/publish', authenticateJWT, AuthController.updatePostPublishStatus);

// token-based authentication
router.post('/logout', authenticateJWT,AuthController.logoutHandler); // logout ลบ token
router.post('/verify-password', authenticateJWT, AuthController.verifyPasswordHandler);
router.get('/profile',authenticateJWT, AuthController.getProfileHandler); // getByToken
router.put('/profile',authenticateJWT, AuthController.updateProfileHandler); // update by token
router.get('/admin',authenticateJWT, AuthController.getAllAdminsHandler); // getAllFetch Admin
router.get('/admin/:id',authenticateJWT, AuthController.getAdminByIdHandler); // get by id
router.put('/admin/:id',authenticateJWT, AuthController.updateAdminHandler); // update by id
router.delete('/admin/:id',authenticateJWT, AuthController.deleteAdminHandler); //delete by id

export default router;
