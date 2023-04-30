import express from 'express';
import { getTeacher, postTeacher, deleteTeacher, updateTeacher } from '../controllers/teacher.mjs';
import upload from '../middleware/multerMiddleware.mjs';

const router = express.Router()
// Define routes and corresponding functions
//upload is multer middleware
router.get('/get', getTeacher);
router.post('/post', upload.single('file'), postTeacher);
router.delete('/delete/:id', deleteTeacher);
router.patch('/update/:id', upload.single('file'), updateTeacher);

// Export the router module
export default router;