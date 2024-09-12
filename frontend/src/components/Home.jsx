import React from 'react';
import { useGetDestinationsQuery } from '../redux/api'; // Assuming you have this query set up
import { Link } from 'react-router-dom';

const Home = () => {
  const { data: destinations = [], isLoading, error } = useGetDestinationsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message}</p>; // Display error message if there is one

  // Debugging: Check what destinations data looks like
  console.log('Destinations:', destinations);

  return (
    <div>
      <h1>Destinations</h1>
      {destinations.length === 0 ? (
        <p>No destinations available.</p>
      ) : (
        destinations.map(destination => (
          <div key={destination.id} style={{ marginBottom: '20px' }}>
            <h2>{destination.name}</h2> {/* Change to 'name' to match your seeded data */}
            <img 
              src={destination.picture} 
              alt={destination.name} 
              style={{ width: '300px', height: '200px' }} 
            />
            <p>{destination.review}</p>
            <Link to={`/destination/${destination.id}`}>See Reviews</Link>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;



