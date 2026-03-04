const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('./model/users');
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('./model/product');


// get all users
app.get('/users', async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    console.error('Error in /users endpoint:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// get user by id
app.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error in /users/:id endpoint:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// create user
app.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await createUser({ name, email });
    res.status(201).json(user);
  } catch (error) {
    console.error('Error in /users endpoint:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// update user
app.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    console.log('Updating user:', { id, name, email });
    const user = await updateUser(id, { name, email });
    console.log('User updated successfully:', user);
    res.json(user);
  } catch (error) {
    console.error('Error in /users/:id endpoint:', error);
    res.status(500).json({ error: 'Failed to update user', details: error.message });
  }
});

// delete user
app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await deleteUser(id);
    res.json(user);
  } catch (error) {
    console.error('Error in /users/:id endpoint:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});


// get all products
app.get('/products', async (req, res) => {
  try {
    const products = await getProducts();
    res.json(products);
  } catch (error) {
    console.error('Error in /products endpoint:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// get product by id
app.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getProductById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error in /products/:id endpoint:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// create product
app.post('/products', async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const product = await createProduct({ name, description, price });
    res.status(201).json(product);
  } catch (error) {
    console.error('Error in /products endpoint:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// update product
app.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    console.log('Updating product:', { id, name, description, price });
    const product = await updateProduct(id, { name, description, price });
    console.log('Product updated successfully:', product);
    res.json(product);
  } catch (error) {
    console.error('Error in /products/:id endpoint:', error);
    res.status(500).json({ error: 'Failed to update product', details: error.message });
  }
});

// delete product
app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await deleteProduct(id);
    res.json(product);
  } catch (error) {
    console.error('Error in /products/:id endpoint:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});