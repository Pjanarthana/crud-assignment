import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import axios from 'axios';
import UserList from './UserList';
import UserForm from './UserForm';
import UserDetails from './UserDetails';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch users. Please try again later.');
      setLoading(false);
    }
  };

  const createUser = async (userData) => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', userData);
      setUsers([...users, response.data]);
    } catch (err) {
      setError('Failed to create user. Please try again.');
    }
  };

  const updateUser = async (id, userData) => {
    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, userData);
      setUsers(users.map(user => user.id === id ? response.data : user));
    } catch (err) {
      setError('Failed to update user. Please try again.');
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      setError('Failed to delete user. Please try again.');
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Router>
      <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
        <header>
          <h1>User Management</h1>
          <button className="menu-toggle" onClick={toggleMenu}>
            ☰
          </button>
          <nav className={menuOpen ? 'open' : ''}>
            <ul>
              <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
              <li><Link to="/create" onClick={() => setMenuOpen(false)}>Create User</Link></li>
            </ul>
          </nav>
          <button onClick={toggleDarkMode} className="dark-mode-toggle">
            {darkMode ? '☀️' : '🌙'}
          </button>
        </header>

        <main>
          {error && <div className="error">{error}</div>}

          {loading ? (
            <div className="loader">
              <div className="spinner"></div>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={<UserList users={users} onDelete={deleteUser} />} />
              <Route path="/create" element={<UserForm onSubmit={createUser} />} />
              <Route path="/edit/:id" element={<UserForm users={users} onSubmit={updateUser} />} />
              <Route path="/user/:id" element={<UserDetails users={users} />} />
            </Routes>
          )}
        </main>

        <footer>
          <p>&copy; 2023 User Management App. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;