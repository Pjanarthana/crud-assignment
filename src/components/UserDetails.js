import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './UserDetails.css';

const UserDetails = ({ users }) => {
  const { id } = useParams();
  const user = users.find(u => u.id === parseInt(id));

  if (!user) {
    return <div className="user-not-found">User not found</div>;
  }

  return (
    <div className="user-details">
      <h2>{user.name}</h2>
      <p className="username">{user.username}</p>
      <div className="detail">
        <strong>Email:</strong> {user.email}
      </div>
      <div className="detail">
        <strong>Phone:</strong> {user.phone}
      </div>
      <div className="detail">
        <strong>Website:</strong> {user.website}
      </div>
      <div className="detail">
        <strong>Company:</strong> {user.company.name}
      </div>
      <Link to="/" className="back-link">Back to User List</Link>
    </div>
  );
};

export default UserDetails;