import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Logout = ({ setToken }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/home'); // Redirect to home page after logout
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
