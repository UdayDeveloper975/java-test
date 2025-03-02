import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to DateMatch</h1>
        <p>Find your perfect match based on gender, age, and shared interests</p>
      </div>
      
      <div className="features-section">
        <div className="feature-card">
          
          <h2>Browse Users</h2>
          <p>View all registered users in our dating platform</p>
          <Link to="/users" className="btn btn-primary">View Users</Link>
        </div>
        
        <div className="feature-card">
         
          <h2>Join Now</h2>
          <p>Register yourself to find your perfect match</p>
          <Link to="/add-user" className="btn btn-primary">Register</Link>
        </div>
        
        <div className="feature-card">
          <h2>Smart Matching</h2>
          <p>Our algorithm finds the best matches based on compatibility</p>
          <Link to="/users" className="btn btn-primary">Find Matches</Link>
        </div>
      </div>
      
      <div className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Register</h3>
            <p>Create your profile with your details and interests</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Browse</h3>
            <p>View other users on the platform</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Match</h3>
            <p>Get personalized recommendations based on compatibility</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;