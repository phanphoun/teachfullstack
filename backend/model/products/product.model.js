const { promisePool } = require('../../database');

class ProductModel {
  // Get all products
  static async getAllProducts() {
    try {
      const [rows] = await promisePool.execute('SELECT * FROM products ORDER BY created_at DESC');
      return rows;
    } catch (error) {
      throw new Error('Failed to fetch products: ' + error.message);
    }
  }

  // Get product by ID
  static async getProductById(id) {
    try {
      const [rows] = await promisePool.execute('SELECT * FROM products WHERE id = ?', [id]);
      return rows[0] || null;
    } catch (error) {
      throw new Error('Failed to fetch product: ' + error.message);
    }
  }

  // Create new product
  static async createProduct(productData) {
    try {
      const { name, description, price, category, stock_quantity, sku } = productData;
      const [result] = await promisePool.execute(
        'INSERT INTO products (name, description, price, stock_quantity, sku) VALUES (?, ?, ?, ?, ?)',
        [name, description || null, price || 0.00, stock_quantity || 0, sku || null]
      );
      return { 
        id: result.insertId, 
        name, 
        description: description || null, 
        price: price || 0.00, 
        category: category || null, 
        stock_quantity: stock_quantity || 0, 
        sku: sku || null 
      };
    } catch (error) {
      throw new Error('Failed to create product: ' + error.message);
    }
  }

  // Update product
  static async updateProduct(id, productData) {
    try {
      const { name, description, price, category, stock_quantity, sku } = productData;
      const [result] = await promisePool.execute(
        'UPDATE products SET name = ?, description = ?, price = ?, category = ?, stock_quantity = ?, sku = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [name, description || null, price || 0.00, category || null, stock_quantity || 0, sku || null, id]
      );
      if (result.affectedRows === 0) {
        return null;
      }
      return { 
        id: parseInt(id), 
        name, 
        description: description || null, 
        price: price || 0.00, 
        category: category || null, 
        stock_quantity: stock_quantity || 0, 
        sku: sku || null 
      };
    } catch (error) {
      throw new Error('Failed to update product: ' + error.message);
    }
  }

  // Delete product
  static async deleteProduct(id) {
    
    try {
      const [result] = await promisePool.execute('DELETE FROM products WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error('Failed to delete product: ' + error.message);
    }
  }
}

module.exports = ProductModel;