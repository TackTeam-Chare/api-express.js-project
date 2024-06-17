import pool from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// function create a new admin user
// const createAdmin = async (req, res) => {
//     const { username, password, name } = req.body;
//     try {
//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Insert the new admin into the database with the hashed password
//         const [result] = await pool.query('INSERT INTO admin (username, password, name) VALUES (?, ?, ?)', [username, hashedPassword, name]);

//         res.json({ message: 'Admin created successfully', id: result.insertId });
//     } catch (error) {
//         console.error('Error creating admin:', error);
//         res.status(500).json({ error: error.message });
//     }
// };

const createAdmin = async (req, res) => {
    const { username, password, name } = req.body;
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new admin into the database with the hashed password
        const [result] = await pool.query('INSERT INTO admin (username, password, name) VALUES (?, ?, ?)', [username, hashedPassword, name]);

        // Generate a token for the newly created admin
        const token = jwt.sign({ id: result.insertId, username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Store the token in the database
        await storeToken(result.insertId, token);

        res.json({ message: 'Admin created successfully', id: result.insertId });
    } catch (error) {
        console.error('Error creating admin:', error);
        res.status(500).json({ error: error.message });
    }
};

const storeToken = async (adminId, token) => {
    try {
        await pool.query('INSERT INTO admin_tokens (admin_id, token) VALUES (?, ?)', [adminId, token]);
    } catch (error) {
        console.error('Error storing token:', error);
        throw error;
    }
};
// const login = async (req, res) => {
//     const { username, password } = req.body;
//     try {
//         // Fetch the user from the database
//         const [rows] = await pool.query('SELECT * FROM admin WHERE username = ?', [username]);
//         const admin = rows[0];

//         // Check if the user exists and the password matches
//         if (admin && await bcrypt.compare(password, admin.password)) {
//             // Generate a token if the username and password match
//             const token = jwt.sign({ id: admin.id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
//             res.json({ token });
//         } else {
//             res.status(401).json({ error: 'Invalid username or password' });
//         }
//     } catch (error) {
//         // Handle any other errors
//         console.error('Login error:', error);
//         res.status(500).json({ error: error.message });
//     }
// };
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

            // Store the token in the database
            await pool.query('UPDATE admin_tokens SET token = ? WHERE id = ?', [token, admin.id]);
            
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


// const logout = (req, res) => {
//     // Optionally, log the logout action for auditing purposes
//     console.log(`Admin ID ${req.user.id} logged out.`);
//     // Send a success response
//     res.json({ message: 'Logout successful' });
// };

const logout = async (req, res) => {
    const adminId = req.user.id; // Assuming `req.user.id` is set by `authenticateJWT` middleware

    try {
        // Clear the JWT token in the database
        await pool.query('UPDATE admin_tokens SET token = NULL WHERE id = ?', [adminId]);

        res.json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ error: error.message });
    }
};



const getProfile = async (req, res) => {
    try {
        const adminId = req.user.id;
        const [rows] = await pool.query('SELECT id, username, name FROM admin WHERE id = ?', [adminId]);
        const admin = rows[0];

        if (admin) {
            res.json(admin);
        } else {
            res.status(404).json({ error: 'Admin not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// AuthController.js
const updateProfile = async (req, res) => {
    const { username,name, password } = req.body;
    const adminId = req.user.id;

    try {
        let updates = [];
        let values = [];

        // Update the name if provided
        if (name) {
            updates.push('name = ?');
            values.push(name);
        }
        // Update the name if provided
        if (username) {
            updates.push('username = ?');
            values.push(username);
        }

        // Update the password if provided (and hash it)
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updates.push('password = ?');
            values.push(hashedPassword);
        }

        // If no valid updates provided
        if (updates.length === 0) {
            return res.status(400).json({ error: 'No updates provided' });
        }

        values.push(adminId);
        const [result] = await pool.query(`UPDATE admin SET ${updates.join(', ')} WHERE id = ?`, values);

        if (result.affectedRows > 0) {
            res.json({ message: 'Profile updated successfully' });
        } else {
            res.status(404).json({ error: 'Admin not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




export default { createAdmin,login,getProfile,updateProfile,logout  };
