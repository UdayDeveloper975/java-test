import React, { useState, useEffect } from 'react';
import UserCard from '../components/UserCard';
import { api } from '../services/api';
import './UserDetails.css';

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/api/users');
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch users. Please try again later.');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

 

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  return (
    <div className="user-details-container">
      <h1 className="page-title">All Users</h1>
      
      {users.length === 0 ? (
        <div className="no-users">
          <p>No users found. Be the first to register!</p>
        </div>
      ) : (
        <div className="users-grid">
          {users.map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDetails;