import express from 'express';
import { getTasks, createTask, updateTask, changeTaskStatus, deleteTask } from '../controllers/taskController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getTasks);
router.post('/', authMiddleware, createTask);
router.put('/:id', authMiddleware, updateTask);
router.put('/changeStatus/:id', authMiddleware, changeTaskStatus);
router.delete('/:id', authMiddleware, deleteTask);

export default router;
