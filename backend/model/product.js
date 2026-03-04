



const { promisePool } = require('../database.js');

// Get all users from database
const getProducts = async () => {
  try {
    const [rows] = await promisePool.execute('SELECT id, name, description, price FROM products ORDER BY id');
    return rows;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Get product by ID
const getProductById = async (id) => {
  try {
    const [rows] = await promisePool.execute('SELECT id, name, description, price FROM products WHERE id = ?', [parseInt(id)]);
    return rows[0] || null;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
};

// Create new product
const createProduct = async (productData) => {
  try {
    const { name, description, price } = productData;
    const [result] = await promisePool.execute(
      'INSERT INTO products (name, description, price) VALUES (?, ?, ?)',
      [name, description, price]
    );
    return { id: result.insertId, name, description, price };
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// Update product
const updateProduct = async (id, productData) => {
  try {
    const { name, description, price } = productData;
    const [result] = await promisePool.execute(
      'UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?',
      [name, description, price, parseInt(id)]
    );
    if (result.affectedRows === 0) {
      throw new Error('Product not found');
    }
    return { id: parseInt(id), name, description, price };
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// Delete product
const deleteProduct = async (id) => {
  try {
    const [result] = await promisePool.execute('DELETE FROM products WHERE id = ?', [parseInt(id)]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

module.exports = { 
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
