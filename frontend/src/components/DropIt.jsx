import React, { useState } from 'react';
import { useAddReviewMutation } from '../redux/api'; // Adjust the import path as necessary

const locations = [
  "New York, USA",
  "London, UK",
  "Tokyo, Japan",
  "Sydney, Australia",
  "Paris, France",
  // Add more locations as needed
];

const DropIt = () => {
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
    
    // Create a FormData object to handle file upload
    const formData = new FormData();
    formData.append('review', review);
    formData.append('location', selectedLocation);
    if (image) {
      formData.append('image', image);
    }

    try {
      // Assuming addReview accepts a FormData object
      await addReview(formData).unwrap();
      setReview('');
      setImage(null);
      setSelectedLocation('');
    } catch (error) {
      console.error('Failed to add review:', error);
      // Handle error
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
