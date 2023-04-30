import express from 'express';
import { getAllTodo, createTodo, updateTodo, deleteTodo } from '../controllers/todo.mjs';

const router = express.Router();
// Get all to-do items for a user
router.get('/get/:id', getAllTodo);

// Create a new to-do item for a user
router.post('/post', createTodo);

// Update a to-do item for a user
router.put('/:id', updateTodo);

// Delete a to-do item for a user
router.delete('/delete/:id', deleteTodo);

export default router;
