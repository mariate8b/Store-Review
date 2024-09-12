import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ token }) => (
  <nav>
    <Link to="/home">Home</Link>
    {token ? (
      <>
        
        <Link to="/destinationslist">Destinations List</Link>
        <button onClick={() => {
          localStorage.removeItem('token');
          window.location.href = '/home'; // Force reload to clear state
        }}>Logout</button>
      </>
    ) : (
      <>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </>
    )}
  </nav>
);

export default NavBar;



  