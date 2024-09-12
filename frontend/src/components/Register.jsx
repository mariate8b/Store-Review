import React, { useState } from 'react';
import { useRegisterMutation } from '../redux/api';

const Register = ({ setToken }) => {
  const [register, { isLoading, error }] = useRegisterMutation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Debugging: Check type of setToken
  console.log('setToken type:', typeof setToken);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await register({ username, password }).unwrap();
      localStorage.setItem('token', response.token);
      if (typeof setToken === 'function') {
        setToken(response.token);
      } else {
        console.error('setToken is not a function');
      }
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <form onSubmit={handleRegister}>
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
      <button type="submit" disabled={isLoading}>Register</button>
      {error && <p>Error: {error.message}</p>}
    </form>
  );
};

export default Register;



