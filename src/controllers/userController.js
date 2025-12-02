import User from '../models/User.js';
import bcrypt from 'bcrypt';

const generatePassword = (length = 10) => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
};

export const createUser = async (req, res) => {
    try {
        const { email, role, name, job } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const rawPassword = generatePassword();
        const hashedPassword = await bcrypt.hash(rawPassword, 10);

        const newUser = new User({
            email,
            password: hashedPassword,
            role: role || 'user',
            name: name || '',
            job: job || '',
        });

        await newUser.save();

        res.status(201).json({
            message: 'User created successfully',
            user: {
                _id: newUser._id,
                email: newUser.email,
                role: newUser.role,
                name: newUser.name,
                job: newUser.job,
                createdAt: newUser.createdAt,
            },
            generatedPassword: rawPassword
        });
    } catch (error) {
        console.error('Create user error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        console.error('Get all users error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, role, name, job } = req.body;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (email) user.email = email;
        if (role) user.role = role;
        if (name !== undefined) user.name = name;
        if (job !== undefined) user.job = job;

        await user.save();

        res.json({
            message: 'User updated successfully',
            user: {
                _id: user._id,
                email: user.email,
                role: user.role,
                name: user.name,
                job: user.job,
                createdAt: user.createdAt,
            }
        });
    } catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newPassword = generatePassword();
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.json({
            message: 'Password reset successfully',
            newPassword: newPassword,
            email: user.email
        });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { email, password, name, job } = req.body;
        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (email) user.email = email;
        if (name !== undefined) user.name = name;
        if (job !== undefined) user.job = job;
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();

        res.json({
            message: 'Profile updated successfully',
            user: {
                _id: user._id,
                email: user.email,
                role: user.role,
                name: user.name,
                job: user.job,
            }
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};