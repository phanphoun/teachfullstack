const ProductModel = require('../model/products/product.model');

class ProductController {
  // Get all products
  static async getAllProducts(req, res) {
    try {
      const products = await ProductModel.getAllProducts();
      res.status(200).json({
        success: true,
        message: 'Products retrieved successfully',
        data: products
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to fetch products'
      });
    }
  }

  // Get product by ID
  static async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductModel.getProductById(id);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'Product retrieved successfully',
        data: product
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to fetch product'
      });
    }
  }

  // Create new product
  static async createProduct(req, res) {
    try {
      const { name, description, price, category, stock_quantity, sku } = req.body;
      
      // Basic validation
      if (!name) {
        return res.status(400).json({
          success: false,
          message: 'Product name is required'
        });
      }
      
      const newProduct = await ProductModel.createProduct({ 
        name, 
        description, 
        price, 
        category, 
        stock_quantity, 
        sku 
      });
      
      res.status(201).json({
        success: true,
        message: 'Product created successfully',
        data: newProduct
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to create product'
      });
    }
  }

  // Update product
  static async updateProduct(req, res) {
    try {
      const { id } = req.params;
      const { name, description, price, category, stock_quantity, sku } = req.body;
      
      // Basic validation
      if (!name) {
        return res.status(400).json({
          success: false,
          message: 'Product name is required'
        });
      }
      
      const updatedProduct = await ProductModel.updateProduct(id, { 
        name, 
        description, 
        price, 
        category, 
        stock_quantity, 
        sku 
      });
      
      if (!updatedProduct) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'Product updated successfully',
        data: updatedProduct
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to update product'
      });
    }
  }

  // Delete product
  static async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const deleted = await ProductModel.deleteProduct(id);
      
      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to delete product'
      });
    }
  }
}

module.exports = ProductController;