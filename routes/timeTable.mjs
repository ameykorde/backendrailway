import express from 'express';
import { getTimeTable, timeTableUpload, deleteTimetable } from '../controllers/timeTable.mjs';
import upload from '../middleware/multerMiddleware.mjs';

const router = express.Router();

// POST request for uploading timetable
router.post('/post', upload.array('images'), timeTableUpload);

// GET request for retrieving timetable
router.get('/get', getTimeTable);

// DELETE request for deleting a specific timetable by id
router.delete('/delete/:id', deleteTimetable);

export default router;
