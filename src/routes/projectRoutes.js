import express from 'express';
import { getProjects, createProject, updateProject, deleteProject } from '../controllers/projectController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getProjects);
router.post('/', authMiddleware, upload.single('coverImage'), createProject);
router.put('/:id', authMiddleware, upload.single('coverImage'), updateProject);
router.delete('/:id', authMiddleware, deleteProject);

export default router;

