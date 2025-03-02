import React from 'react';
import './RecommendationCard.css';

const RecommendationCard = ({ user, rank }) => {
  return (
    <div className="recommendation-card">
      <div className="recommendation-rank">⭐{rank}</div>
      <div className="recommendation-card-content">
        <div className="recommendation-card-header">
          <h3>{user.name}</h3>
          <span className={`gender-badge ${user.gender.toLowerCase()}`}>
            {user.gender}
          </span>
        </div>
        <div className="recommendation-card-body">
          <p><strong>Age:</strong> {user.age}</p>
          <p><strong>Interests:</strong> {user.interests.join(', ')}</p>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;