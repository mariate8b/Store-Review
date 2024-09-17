import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search).get('query');

  // Fetch search results based on the query or display results
  // For demonstration, just display the query
  
  return (
    <div>
      <h1>Search Results</h1>
      <p>Results for: {query}</p>
      {/* Display search results here */}
    </div>
  );
};

export default SearchBar;
