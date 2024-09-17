// components/Home.jsx

//NOTES IMPORTANT //
// thedestination destination is already fetching , it needs unique locations with rating for none users with the option of r
import React from 'react';
import { useGetDestinationsQuery } from '../redux/api';

const Home = () => {
  const { data: destinations = [], isLoading, error } = useGetDestinationsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className = "destinationsHome">
      <h1>Destinations</h1>
      {destinations.length === 0 ? (
        <p>No destinations available.</p>
      ) : (
        destinations.map(destination => (
          <div key={destination.id}>
            <h2>{destination.name}</h2>
            <img src={destination.picture} alt={destination.name} style={{ width: '300px', height: '200px' }} />
            <p>{destination.review}</p>
            <button>See comments</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;







