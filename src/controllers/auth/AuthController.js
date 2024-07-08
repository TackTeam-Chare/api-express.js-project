import pool from '../../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import AdminModel from '../../models/auth/Admin.js';

dotenv.config();

const createAdmin = async (req, res) => {
    const { username, password, name } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query('INSERT INTO admin (username, password, name) VALUES (?, ?, ?)', [username, hashedPassword, name]);
        const token = jwt.sign({ id: result.insertId, username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        await storeToken(result.insertId, token);
        res.json({ message: 'Admin created successfully', id: result.insertId, token });
    } catch (error) {
        console.error('Error creating admin:', error);
        res.status(500).json({ error: error.message });
    }
};

const storeToken = async (adminId, token) => {
    try {
        await pool.query(
            'INSERT INTO admin_tokens (admin_id, token) VALUES (?, ?) ON DUPLICATE KEY UPDATE token = ?',
            [adminId, token, token]
        );
    } catch (error) {
        console.error('Error storing token:', error);
        throw error;
    }
};


const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const [rows] = await pool.query('SELECT * FROM admin WHERE username = ?', [username]);
        const admin = rows[0];
        if (admin && await bcrypt.compare(password, admin.password)) {
            const token = jwt.sign({ id: admin.id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
            await storeToken(admin.id, token);
            res.json({ token });
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Login error:', error);
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
            res.status(404).json({
                error: 'Admin not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// AuthController.js
const updateProfile = async (req, res) => {
    const {
        username,
        name,
        password
    } = req.body;
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
            return res.status(400).json({
                error: 'No updates provided'
            });
        }

        values.push(adminId);
        const [result] = await pool.query(`UPDATE admin SET ${updates.join(', ')} WHERE id = ?`, values);

        if (result.affectedRows > 0) {
            res.json({
                message: 'Profile updated successfully'
            });
        } else {
            res.status(404).json({
                error: 'Admin not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

const logout = async (req, res) => {
    const adminId = req.user.id;
    try {
        const token = req.header('Authorization')?.split(' ')[1];
        if (!token) {
            return res.status(403).json({ message: 'Access denied, no token provided.' });
        }
        await pool.query('DELETE FROM admin_tokens WHERE admin_id = ? AND token = ?', [adminId, token]);
        res.json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get all admins
const getAllAdmins = async (req, res) => {
    try {
        const admins = await AdminModel.getAllAdmins();
        res.json(admins);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get admin by ID
const getAdminById = async (req, res) => {
    try {
        const id = req.params.id;
        const admin = await AdminModel.getAdminById(id);
        if (admin) {
            res.json(admin);
        } else {
            res.status(404).json({ error: 'Admin not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update an admin
const updateAdmin = async (req, res) => {
    const id = req.params.id;
    const admin = req.body;
    try {
        const affectedRows = await AdminModel.update(id, admin);
        if (affectedRows > 0) {
            res.json({ message: `Admin with ID ${id} updated successfully` });
        } else {
            res.status(404).json({ error: 'Admin not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an admin
const deleteAdmin = async (req, res) => {
    const id = req.params.id;
    try {
        const affectedRows = await AdminModel.remove(id);
        if (affectedRows > 0) {
            res.json({ message: `Admin with ID ${id} deleted successfully` });
        } else {
            res.status(404).json({ error: 'Admin not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export default {
    getAllAdmins,
    getAdminById,
    createAdmin,
    updateAdmin,
    deleteAdmin,
    storeToken,
    login,
    getProfile,
    updateProfile,
    logout
};