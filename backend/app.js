

const express = require('express');
const cors = require('cors');
const app = express();


// Enable CORS for all routes
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Import routes
const userRoutes = require('./routes/user.routes');
app.use('/api/users', userRoutes);

module.exports = app;

