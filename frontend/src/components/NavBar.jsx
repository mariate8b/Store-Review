import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = ({ token }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchQuery) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav>
      <h1 className = "DropItName">Drop It</h1>
      <img 
        src="https://img.freepik.com/premium-vector/red-pin-location_1256222-925.jpg?semt=ais_hybrid" 
        alt="Logo" 
        className="logo"
      />
      <Link to="/home">Home</Link>
      {token ? (
        <>
          <Link to="/destinationslist">Destinations List</Link>
          <Link to="/dropIt">Drop It</Link>
          <Link to="/myAccount">My Account</Link>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/home'; // Force reload to clear state
            }}
          >
            Logout
          </button>
        </>
        
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
      {/* Search Bar */}
      <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: '8px', fontSize: '16px' }}
        />
        <button type="submit" style={{ padding: '8px', fontSize: '16px' }}>Search</button>
      </form>
    </nav>
  );
};

export default NavBar;



  