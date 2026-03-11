import express from 'express';
import {
    createUser,
    getAllUsers,
    updateUser,
    deleteUser,
    resetPassword,
    getProfile,
    updateProfile,
    uploadAvatar
} from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);
router.put('/profile/avatar', authMiddleware, upload.single('avatar'), uploadAvatar);

router.post('/admin/users', authMiddleware, adminMiddleware, createUser);
router.get('/admin/users', authMiddleware, adminMiddleware, getAllUsers);
router.put('/admin/users/:id', authMiddleware, adminMiddleware, updateUser);
router.delete('/admin/users/:id', authMiddleware, adminMiddleware, deleteUser);
router.post('/admin/users/:id/reset-password', authMiddleware, adminMiddleware, resetPassword);

export default router;

