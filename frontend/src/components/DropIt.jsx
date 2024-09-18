import React, { useState } from 'react';
import { useAddReviewMutation } from '../redux/api';

const DropIt = ({ destinationId }) => { // Get destinationId as a prop
  const [review, setReview] = useState('');
  const [image, setImage] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [addReview, { isLoading, error }] = useAddReviewMutation();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setSelectedLocation(value);
    setFilteredLocations(locations.filter(loc => loc.toLowerCase().includes(value.toLowerCase())));
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setFilteredLocations([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('review', review);
    formData.append('location', selectedLocation);
    if (image) {
      formData.append('image', image); // Make sure to adjust the backend if needed
    }

    try {
      await addReview({ destinationId, review, picture: image }).unwrap();
      setReview('');
      setImage(null);
      setSelectedLocation('');
    } catch (error) {
      console.error('Failed to add review:', error);
    }
  };

  return (
    <div className='Dropitform'>
      <h1>Add a Review</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            id="location"
            type="text"
            value={selectedLocation}
            onChange={handleLocationChange}
            placeholder="Search for a location..."
          />
          {filteredLocations.length > 0 && (
            <ul>
              {filteredLocations.map((loc, index) => (
                <li key={index} onClick={() => handleLocationSelect(loc)}>
                  {loc}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <label htmlFor="review">Review:</label>
          <textarea
            id="review"
            value={review}
            onChange={handleReviewChange}
            placeholder="Write your review here..."
            required
          />
        </div>
        <div>
          <label htmlFor="image">Upload an Image:</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          Post
        </button>
        {error && <p>Error: {error.message}</p>}
      </form>
    </div>
  );
};

export default DropIt;

