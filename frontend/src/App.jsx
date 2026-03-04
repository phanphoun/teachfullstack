import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import CreateUserForm from './components/CreateUserForm'
import { getUsers } from './api'
import Users from './components/Users'
import EditUser from './components/EditUser'
import Products from './components/Products'

function App() {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    getUsers().then((users) => {
      setUsers(users);
    }).catch((error) => {
      console.log(error);
      console.log('Error fetching users');
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    // Listen for user updates from EditUser component
    const handleUserUpdated = () => {
      fetchUsers();
    };

    window.addEventListener('userUpdated', handleUserUpdated);
    
    return () => {
      window.removeEventListener('userUpdated', handleUserUpdated);
    };
  }, []);



  return (
    <Router>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Routes>
            <Route path="/" element={
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-8">User Management</h1>
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <h2 className="text-xl font-semibold mb-4">Create New User</h2>
                  <CreateUserForm onUserCreated={fetchUsers}/>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-4">Users List</h2>
                  <Users users={users} onUserUpdated={fetchUsers} />
                </div>
              </div>
            } />
            <Route path="/edit-user/:id" element={
              <div className="max-w-2xl mx-auto">
                <EditUser onUserUpdated={fetchUsers} />
              </div>
            } />
            <Route path="/products" element={
              <div>
                <Products />
              </div>
            } />
          </Routes>
          <div className="mt-8 text-center">
            <a href="/" className="text-blue-600 hover:text-blue-800 mr-4">Back to Users</a>
            <a href="/products" className="text-blue-600 hover:text-blue-800">View Products</a>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
