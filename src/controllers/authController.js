import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create token with userId, email, and role
        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
                role: user.role
            },
            SECRET_KEY,
            { expiresIn: '30min' }
        );

        res.json({ token, role: user.role });
    } catch (error) {
        console.error('Signin error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
