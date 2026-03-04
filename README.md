# Full Stack Web Application

## Description
This is a full stack web application featuring a React frontend and a Node.js/Express backend with MySQL database. It provides user management and product management functionalities.

## Tech Stack
- **Frontend**: React 19, Vite, TailwindCSS, React Router
- **Backend**: Node.js, Express.js, MySQL2, JWT, CORS, Helmet
- **Database**: MySQL
- **Development Tools**: Vite, Nodemon, ESLint, Babel

## Prerequisites
- Node.js (version 18 or higher)
- MySQL Server (version 8.0 or higher)
- npm (comes with Node.js)

## Dependencies Details

### Backend Dependencies (from `backend/package.json`)
- **core-js-compat** (3.48.0): Provides polyfills for modern JavaScript features to ensure compatibility across different environments and browsers.
- **cors** (^2.8.6): Enables Cross-Origin Resource Sharing (CORS) middleware for Express, allowing your frontend to make requests to the backend from different origins.
- **express** (5.2.1): A minimal and flexible Node.js web application framework used to build the API server.
- **helmet** (8.1.0): Security middleware that sets various HTTP headers to protect against common web vulnerabilities like XSS and clickjacking.
- **jsonwebtoken** (9.0.3): Library for creating and verifying JSON Web Tokens (JWT), used for authentication and authorization.
- **mysql2** (3.18.2): A MySQL client for Node.js that allows connecting to and querying the MySQL database.
- **nodemon** (3.1.14): A development tool that automatically restarts the server when file changes are detected.

### Frontend Dependencies (from `frontend/package.json`)

#### Dependencies
- **react** (^19.2.0): The core React library for building user interfaces with components.
- **react-dom** (^19.2.0): Provides DOM-specific methods for rendering React components in the browser.
- **react-router-dom** (^7.13.1): A routing library for React that enables navigation between different pages or views in a single-page application.

#### DevDependencies
- **@eslint/js** (^9.39.1): Configuration for ESLint, a tool for identifying and fixing JavaScript code issues.
- **@types/react** (^19.2.7): TypeScript type definitions for React, providing type checking and IntelliSense.
- **@types/react-dom** (^19.2.3): TypeScript types for React DOM.
- **@vitejs/plugin-react** (^5.1.1): Vite plugin that enables fast React development with Hot Module Replacement (HMR).
- **autoprefixer** (^10.4.27): A PostCSS plugin that automatically adds vendor prefixes to CSS rules.
- **eslint** (^9.39.1): A linting tool to enforce code quality and style guidelines.
- **eslint-plugin-react-hooks** (^7.0.1): ESLint rules for React hooks to prevent common mistakes.
- **eslint-plugin-react-refresh** (^0.4.24): ESLint plugin for React Fast Refresh to ensure compatibility.
- **globals** (^16.5.0): Defines global variables for ESLint configuration.
- **postcss** (^8.5.8): A tool for transforming CSS with JavaScript, used with TailwindCSS.
- **tailwindcss** (^3.4.19): A utility-first CSS framework for rapidly building custom user interfaces.
- **vite** (^8.0.0-beta.13): A fast build tool and development server for modern web projects.

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd full-stack
   ```

2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```
   cd ../frontend
   npm install
   ```

### Dependency Installation Commands

For Windows PowerShell:

- Backend dependencies:
  ```
  cd backend; npm install
  ```

- Frontend dependencies:
  ```
  cd frontend; npm install
  ```

### Setting Up TailwindCSS

TailwindCSS is already installed and configured in the frontend project. It is included in the devDependencies and will be installed with `npm install`.

The configuration files are already set up:
- `tailwind.config.js`
- `postcss.config.js`
- CSS directives in `src/index.css`

If you need to set up TailwindCSS manually in a new project:

1. Install TailwindCSS and its dependencies:
   ```
   npm install -D tailwindcss postcss autoprefixer
   ```

2. Initialize TailwindCSS:
   ```
   npx tailwindcss init -p
   ```

3. Configure `tailwind.config.js` (content paths):
   ```javascript
   /** @type {import('tailwindcss').Config} */
   export default {
     content: [
       "./index.html",
       "./src/**/*.{js,ts,jsx,tsx}",
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   }
   ```

4. Add Tailwind directives to your CSS (e.g., `src/index.css`):
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

5. Import the CSS in your main file (e.g., `src/main.jsx`):
   ```javascript
   import './index.css'
   ```

## Database Setup

1. Ensure MySQL server is running on your system.

2. Update the environment variables in `backend/.env` with your MySQL credentials.

3. Run the database setup scripts:
   ```
   cd backend
   mysql -u your_username -p < setup.sql
   mysql -u your_username -p schooldb < setup_products.sql
   ```
   Replace `your_username` with your MySQL username.

This will create the `schooldb` database, `users` table with sample data, and `products` table with sample products.

## Environment Variables

Copy the `backend/.env` file and configure the following variables:
- `PORT`: Server port (default: 3000)
- `API_URL`: API base URL (default: http://localhost:3000)
- `DB_HOST`: MySQL host (default: localhost)
- `DB_USER`: MySQL username
- `DB_PASSWORD`: MySQL password
- `DB_NAME`: Database name (default: schooldb)

## Running the Application

1. Start the backend server:
   ```
   cd backend
   npm run dev
   ```

2. Start the frontend development server:
   ```
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173` for the frontend (Vite default port), and the backend will be running on `http://localhost:3000`.

## Features

### User Management
- View all users
- Get user by ID
- Create new user
- Update existing user
- Delete user

### Product Management
- View all products
- Get product by ID
- Create new product
- Update existing product
- Delete product

## API Endpoints

### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create a new user
- `PUT /users/:id` - Update a user
- `DELETE /users/:id` - Delete a user

### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID
- `POST /products` - Create a new product
- `PUT /products/:id` - Update a product
- `DELETE /products/:id` - Delete a product

## CRUD Operations Code

### Backend CRUD (Users Example)

#### Model (`backend/model/users.js`)
```javascript
const db = require('../database');

// Get all users
const getUsers = async () => {
  const [rows] = await db.execute('SELECT * FROM users');
  return rows;
};

// Get user by ID
const getUserById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
};

// Create user
const createUser = async (user) => {
  const { name, email } = user;
  const [result] = await db.execute(
    'INSERT INTO users (name, email) VALUES (?, ?)',
    [name, email]
  );
  return { id: result.insertId, name, email };
};

// Update user
const updateUser = async (id, user) => {
  const { name, email } = user;
  await db.execute(
    'UPDATE users SET name = ?, email = ? WHERE id = ?',
    [name, email, id]
  );
  return { id: parseInt(id), name, email };
};

// Delete user
const deleteUser = async (id) => {
  await db.execute('DELETE FROM users WHERE id = ?', [id]);
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
```

#### Routes (`backend/index.js`)
```javascript
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('./model/users');

// GET all users
app.get('/users', async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// GET user by ID
app.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// POST create user
app.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await createUser({ name, email });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// PUT update user
app.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const user = await updateUser(id, { name, email });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// DELETE user
app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await deleteUser(id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});
```

### Frontend CRUD (Users Example)

#### Users List Component (`frontend/src/components/Users.jsx`)
```jsx
import { useState, useEffect } from 'react';
import api from '../api';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '' });

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle form submission for create/update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        // Update user
        await api.put(`/users/${editingUser.id}`, formData);
        setEditingUser(null);
      } else {
        // Create user
        await api.post('/users', formData);
      }
      setFormData({ name: '', email: '' });
      fetchUsers(); // Refresh list
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  // Start editing a user
  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email });
  };

  // Delete user
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await api.delete(`/users/${id}`);
        fetchUsers(); // Refresh list
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      
      {/* Create/Edit Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border p-2 mr-2"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="border p-2 mr-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          {editingUser ? 'Update' : 'Create'} User
        </button>
        {editingUser && (
          <button 
            type="button" 
            onClick={() => {
              setEditingUser(null);
              setFormData({ name: '', email: '' });
            }}
            className="bg-gray-500 text-white px-4 py-2 ml-2"
          >
            Cancel
          </button>
        )}
      </form>

      {/* Users List */}
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id} className="border p-4 flex justify-between items-center">
            <div>
              <h3 className="font-bold">{user.name}</h3>
              <p>{user.email}</p>
            </div>
            <div>
              <button 
                onClick={() => handleEdit(user)}
                className="bg-yellow-500 text-white px-3 py-1 mr-2"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(user.id)}
                className="bg-red-500 text-white px-3 py-1"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
```

#### Create User Form Component (`frontend/src/components/CreateUserForm.jsx`)
```jsx
import { useState } from 'react';
import api from '../api';

const CreateUserForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/users', formData);
      setFormData({ name: '', email: '' });
      alert('User created successfully!');
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Create User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create User'}
        </button>
      </form>
    </div>
  );
};

export default CreateUserForm;
```

## Scripts

### Backend
- `npm start` - Start the server in production mode
- `npm run dev` - Start the server in development mode with nodemon

### Frontend
- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License
ISC
