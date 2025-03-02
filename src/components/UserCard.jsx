import React from 'react';
import { Link } from 'react-router-dom';
import './UserCard.css';

const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <div className="user-card-header">
        <h3>{user.name}</h3>
        <span className={`gender-badge ${user.gender.toLowerCase()}`}>
          {user.gender}
        </span>
      </div>
      <div className="user-card-body">
        <p><strong>Age:</strong> {user.age}</p>
        <p><strong>Interests:</strong> {user.interests.join(', ')}</p>
      </div>
      <div className="user-card-footer">
        <Link to={`/recommendations/${user.id}`} className="btn btn-primary">
          View Matches
        </Link>
      </div>
    </div>
  );
};

export default UserCard;