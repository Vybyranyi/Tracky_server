import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.sendStatus(401);
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({ message: 'Token format must be "Bearer <token>"' });
    }

    const token = parts[1];

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            console.error('JWT Verify Error:', err.message);
            return res.status(403).json({ message: 'Invalid or expired token', error: err.message });
        }
        req.user = decoded;
        next();
    });
};

export default authMiddleware;
