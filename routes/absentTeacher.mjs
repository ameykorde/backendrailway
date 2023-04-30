import express from 'express';
import {
  createAbsentTeacher,
  getAbsentTeacher,
  deleteAbsentTeacherById,
  deleteAbsentTeacherByDate
} from '../controllers/absentTeacher.mjs';

const router = express.Router();

// POST route to create a new absent teacher record
router.post('/teacher', createAbsentTeacher);

// GET route to get all absent teacher records
router.get('/teacher/get', getAbsentTeacher);

// DELETE route to delete an absent teacher record by ID
router.delete('/teacher/:id', deleteAbsentTeacherById)

// DELETE route to delete all absent teacher records whose date is less than current date
router.delete('/teacher', deleteAbsentTeacherByDate)

export default router;
