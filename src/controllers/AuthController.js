import pool from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// function create a new admin user
const createAdmin = async (req, res) => {
    const { username, password, name } = req.body;
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new admin into the database with the hashed password
        const [result] = await pool.query('INSERT INTO admin (username, password, name) VALUES (?, ?, ?)', [username, hashedPassword, name]);

        res.json({ message: 'Admin created successfully', id: result.insertId });
    } catch (error) {
        console.error('Error creating admin:', error);
        res.status(500).json({ error: error.message });
    }
};


const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Fetch the user from the database
        const [rows] = await pool.query('SELECT * FROM admin WHERE username = ?', [username]);
        const admin = rows[0];

        // Check if the user exists and the password matches
        if (admin && await bcrypt.compare(password, admin.password)) {
            // Generate a token if the username and password match
            const token = jwt.sign({ id: admin.id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
    } catch (error) {
        // Handle any other errors
        console.error('Login error:', error);
        res.status(500).json({ error: error.message });
    }
};

export default { createAdmin,login };
