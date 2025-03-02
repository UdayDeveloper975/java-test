import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import './AddUser.css';

const AddUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    age: '',
    interests: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error 
    if (errors[name]) { 
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }
    
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (isNaN(formData.age) || parseInt(formData.age) < 18 || parseInt(formData.age) > 100) {
      newErrors.age = 'Age must be a number between 18 and 100';
    }
    
    if (!formData.interests.trim()) {
      newErrors.interests = 'At least one interest is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      
      const interestsArray = formData.interests
        .split(',')
        .map(interest => interest.trim())
        .filter(interest => interest);
      
      const userData = {
        name: formData.name,
        gender: formData.gender,
        age: parseInt(formData.age),
        interests: interestsArray
      };
      
      await api.post('/api/users', userData);
      setSuccess(true);
      
      // Reset form
      setFormData({
        name: '',
        gender: '',
        age: '',
        interests: ''
      });
      
   
      setTimeout(() => {
        navigate('/users');
      }, 2000);
      
    } catch (err) {
      setErrors({
        submit: 'Failed to add user. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-user-container">
      <h1 className="page-title">Register New User</h1>
      
      <div className="card">
        {success ? (
          <div className="success-message">
            <h3>User registered successfully!</h3>
            <p>Redirecting to users page...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <div className="error-message">{errors.name}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                className="form-control"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender && <div className="error-message">{errors.gender}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                name="age"
                className="form-control"
                value={formData.age}
                onChange={handleChange}
                min="18"
                max="100"
              />
              {errors.age && <div className="error-message">{errors.age}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="interests">Interests (comma separated)</label>
              <input
                type="text"
                id="interests"
                name="interests"
                className="form-control"
                value={formData.interests}
                onChange={handleChange}
                placeholder="e.g. Cricket, Movies, Tennis"
              />
              {errors.interests && <div className="error-message">{errors.interests}</div>}
            </div>
            
            {errors.submit && <div className="error-message">{errors.submit}</div>}
            
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddUser;