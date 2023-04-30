import express from 'express';
import upload from '../middleware/multerMiddleware.mjs';
import { uploadCalendar, getCalendar, deleteCalendar } from '../controllers/academicCalendar.mjs';

const router = express.Router();
// API routes for academic calendar
//upload is multer middleware
router.post('/post', upload.single('file'), uploadCalendar); // Upload a new academic calendar
router.get('/get', getCalendar); // Get the academic calendar
router.delete('/delete/:id', deleteCalendar); // Delete the academic calendar by ID

export default router; // Export the router to be used in the main app file