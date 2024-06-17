import pool from '../config/db.js';
import bcrypt from 'bcryptjs';

// Example function to create a new admin user
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

export default { createAdmin };
