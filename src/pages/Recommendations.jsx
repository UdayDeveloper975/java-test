import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import RecommendationCard from '../components/RecommendationCard';
import { api } from '../services/api';
import './Recommendations.css';

const Recommendations = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ error, setError] = useState(null);
  const [limit, setLimit] = useState(2); 

  useEffect(() => {
    const fetchData = async () => {
      try {
      
        const userResponse = await api.get(`/api/users/${userId}`);
        setUser(userResponse.data);
        
       
        const recommendationsResponse = await api.get(`/api/users/${userId}/recommendations?limit=${limit}`);
        setRecommendations(recommendationsResponse.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch recommendations. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, limit]);


// ------------------


  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value));
  };

 
  if (error) {
    return <div className="error-cont ainer">{error}</div>;
  }

  return (
    <div className="recommendations-container">
      {user && (
        <>
          <h1 className="page-title">Recommendations for {user.name}</h1>
          
          <div className="user-profile card">
            <h2>Your Profile</h2>
            <div className="profile-details">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Gender:</strong> {user.gender}</p>
              <p><strong>Age:</strong> {user.age}</p>
              <p><strong>Interests:</strong> {user.interests.join(', ')}</p>
            </div>
          </div>
          
          <div className="recommendations-controls">
            <div className="limit-selector">
              <label htmlFor="limit">Show top:</label>
              <select 
                id="limit" 
                value={limit} 
                onChange={handleLimitChange}
                className="form-control"
              >
                <option value="2">2 matches</option>
                <option value="3">3 matches</option>
                <option value="5">5 matches</option>
                <option value="10">10 matches</option>
              </select>
            </div>
          </div>
          



          <div className="recommendations-list">
            <h2>Top {limit} Matches</h2>
            
            {recommendations.length === 0 ? (
              <div className="no-recommendations">
                <p>No matches found. Try adjusting your interests or wait for more users to join.</p>
              </div>
            ) : (
              recommendations.map((match, index) => (
                <RecommendationCard 
                  key={match.id} 
                  user={match} 
                  rank={index + 1} 
                />
              ))
            )}
          </div>
          

          
          <div className="back-link">
            <Link to="/users" className="btn btn-secondary">Back to All Users</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Recommendations;