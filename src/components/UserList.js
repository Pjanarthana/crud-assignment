import React from 'react';
import { Link } from 'react-router-dom';
import './UserList.css';

const UserList = ({ users, onDelete }) => {
  return (
    <div className="user-list">
      <h2>User List</h2>
      <div className="user-grid">
        {users.map(user => (
          <div key={user.id} className="user-card">
            <h3>{user.name}</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <div className="user-actions">
              <Link to={`/user/${user.id}`} className="view-btn">View</Link>
              <Link to={`/edit/${user.id}`} className="edit-btn">Edit</Link>
              <button onClick={() => onDelete(user.id)} className="delete-btn">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;