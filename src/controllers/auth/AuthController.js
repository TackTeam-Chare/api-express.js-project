import pool from '../../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Model functions

const getAllAdmins = async () => {
  const query = 'SELECT * FROM admin';
  const [rows] = await pool.query(query);
  return rows;
};

const getAdminById = async (id) => {
  const query = 'SELECT * FROM admin WHERE id = ?';
  const [rows] = await pool.query(query, [id]);
  return rows[0];
};

const createAdmin = async (admin) => {
  const query = 'INSERT INTO admin SET ?';
  const [result] = await pool.query(query, admin);
  return result.insertId;
};

const updateAdmin = async (id, admin) => {
  const query = 'UPDATE admin SET ? WHERE id = ?';
  const [result] = await pool.query(query, [admin, id]);
  return result.affectedRows;
};

const removeAdmin = async (id) => {
  const query = 'DELETE FROM admin WHERE id = ?';
  const [result] = await pool.query(query, [id]);
  return result.affectedRows;
};

// Controller functions

// ไม่มี role
// const createAdminHandler = async (req, res) => {
//     const { username, password, name } = req.body;
//     try {
//         const [existingAdmin] = await pool.query('SELECT * FROM admin WHERE username = ?', [username]);
//         if (existingAdmin.length > 0) {
//             return res.status(400).json({ error: 'Username already exists' });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const admin = { username, password: hashedPassword, name };
//         const insertId = await createAdmin(admin);

//         const token = jwt.sign({ id: insertId, username }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         await storeToken(insertId, token);
//         res.json({ message: 'Admin created successfully', id: insertId, token });
//     } catch (error) {
//         console.error('Error creating admin:', error);
//         res.status(500).json({ error: error.message });
//     }
// };

// + role
const createAdminHandler = async (req, res) => {
    const { username, password, name, role } = req.body;
    try {
        const [existingAdmin] = await pool.query('SELECT * FROM admin WHERE username = ?', [username]);
        if (existingAdmin.length > 0) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = { username, password: hashedPassword, name, role };
        const insertId = await createAdmin(admin);

        const token = jwt.sign({ id: insertId, username, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        await storeToken(insertId, token);
        res.json({ message: 'Admin created successfully', id: insertId, token });
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

const loginHandler = async (req, res) => {
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

const getProfileHandler = async (req, res) => {
    try {
        const adminId = req.user.id;
        const admin = await getAdminById(adminId);

        if (admin) {
            res.json(admin);
        } else {
            res.status(404).json({ error: 'Admin not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateProfileHandler = async (req, res) => {
    const { username, name, password } = req.body;
    const adminId = req.user.id;

    try {
        const [currentProfile] = await pool.query('SELECT * FROM admin WHERE id = ?', [adminId]);
        const currentAdmin = currentProfile[0];

        let updates = [];
        let values = [];

        if (name && name !== currentAdmin.name) {
            updates.push('name = ?');
            values.push(name);
        }

        if (username && username !== currentAdmin.username) {
            updates.push('username = ?');
            values.push(username);
        }

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            if (await bcrypt.compare(password, currentAdmin.password)) {
                return res.status(400).json({ error: 'New password must be different from old password' });
            }
            updates.push('password = ?');
            values.push(hashedPassword);
        }

        if (updates.length === 0) {
            return res.status(400).json({ error: 'No updates provided or same as current values' });
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

const logoutHandler = async (req, res) => {
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

const getAllAdminsHandler = async (req, res) => {
    try {
        const admins = await getAllAdmins();
        res.json(admins);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getAdminByIdHandler = async (req, res) => {
    try {
        const id = req.params.id;
        const admin = await getAdminById(id);
        if (admin) {
            res.json(admin);
        } else {
            res.status(404).json({ error: 'Admin not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateAdminHandler = async (req, res) => {
    const id = req.params.id;
    const admin = req.body;
    try {
        const affectedRows = await updateAdmin(id, admin);
        if (affectedRows > 0) {
            res.json({ message: `Admin with ID ${id} updated successfully` });
        } else {
            res.status(404).json({ error: 'Admin not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteAdminHandler = async (req, res) => {
    const id = req.params.id;
    try {
        const affectedRows = await removeAdmin(id);
        if (affectedRows > 0) {
            res.json({ message: `Admin with ID ${id} deleted successfully` });
        } else {
            res.status(404).json({ error: 'Admin not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const verifyPasswordHandler = async (req, res) => {
    const { username, password } = req.body;
    try {
        const [rows] = await pool.query('SELECT * FROM admin WHERE username = ?', [username]);
        const admin = rows[0];
        if (admin && await bcrypt.compare(password, admin.password)) {
            res.json({ verified: true });
        } else {
            res.status(401).json({ verified: false });
        }
    } catch (error) {
        console.error('Verify password error:', error);
        res.status(500).json({ error: error.message });
    }
};

const updatePostPublishStatus = async (req, res) => {
    const { id, published } = req.body;
    try {
      const query = 'UPDATE tourist_entities SET published = ? WHERE id = ?';
      const [result] = await pool.query(query, [published, id]);
      if (result.affectedRows > 0) {
        res.json({ message: 'Post publish status updated successfully' });
      } else {
        res.status(404).json({ error: 'Post not found' });
      }
    } catch (error) {
      console.error('Error updating post publish status:', error);
      res.status(500).json({ error: error.message });
    }
  };

  
export default {
    getAllAdminsHandler,
    getAdminByIdHandler,
    createAdminHandler,
    updateAdminHandler,
    deleteAdminHandler,
    storeToken,
    loginHandler,
    verifyPasswordHandler,
    getProfileHandler,
    updateProfileHandler,
    logoutHandler,
    updatePostPublishStatus
};
