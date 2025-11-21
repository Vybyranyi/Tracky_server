import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;
const users = [{ username: process.env.db_user, password: process.env.db_pass }];

export const signin = async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(usr => usr.username === username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '30min' });

    res.json({ token });
};
