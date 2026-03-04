


const { promisePool } = require('../database.js');

// Get all users from database
const getUsers = async () => {
  try {
    const [rows] = await promisePool.execute('SELECT id, name, email FROM users ORDER BY id');
    return rows;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Get user by ID
const getUserById = async (id) => {
  try {
    const [rows] = await promisePool.execute('SELECT id, name, email FROM users WHERE id = ?', [parseInt(id)]);
    return rows[0] || null;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
};

// Create new user
const createUser = async (userData) => {
  try {
    const { name, email } = userData;
    const [result] = await promisePool.execute(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]
    );
    return { id: result.insertId, name, email };
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Update user
const updateUser = async (id, userData) => {
  try {
    const { name, email } = userData;
    const [result] = await promisePool.execute(
      'UPDATE users SET name = ?, email = ? WHERE id = ?',
      [name, email, parseInt(id)]
    );
    if (result.affectedRows === 0) {
      throw new Error('User not found');
    }
    return { id: parseInt(id), name, email };
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Delete user
const deleteUser = async (id) => {
  try {
    const [result] = await promisePool.execute('DELETE FROM users WHERE id = ?', [parseInt(id)]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

module.exports = { 
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
