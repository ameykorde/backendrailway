import express from 'express';
import { registerUser, loginUser,getUserData,deleteUser,updateUserStatus } from '../controllers/authController.mjs';
import verify from '../middleware/verifyToken.mjs';
const router = express.Router();
// Register routes
router.post('/register/post', registerUser);
router.post('/login/post', loginUser);

// Routes for admin controller
router.get('/getUser',verify, getUserData);
router.delete('/deleteUser/:id',verify, deleteUser);
router.patch('/updateUser/:id',verify,updateUserStatus);

export default router;