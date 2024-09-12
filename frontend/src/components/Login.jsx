import React, { useState } from 'react';
import { useLoginMutation } from '../redux/api';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = ({ setToken }) => {
  const [login, { isLoading, error }] = useLoginMutation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ username, password }).unwrap();
      localStorage.setItem('token', response.token);
      setToken(response.token);
      navigate('/add-destination'); // Redirect to AddDestination after login
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" disabled={isLoading}>Login</button>
      {error && <p>Error: {error.message}</p>}
    </form>
  );
};

export default Login;

