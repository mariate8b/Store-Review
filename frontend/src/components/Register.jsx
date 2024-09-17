// components/Register.jsx

// register works . it prompts to home and destination , it also shows log out 
import React, { useState } from 'react';
import { useRegisterMutation } from '../redux/api';

const Register = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [register, { isLoading, error }] = useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await register({ username, password }).unwrap();
      localStorage.setItem('token', token);
      setToken(token);
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={isLoading}>Register</button>
      {error && <p>Error: {error.message}</p>}
    </form>
  );
};

export default Register;





