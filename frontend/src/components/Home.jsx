import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/reviews');
        setReviews(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchReviews();
  }, []);

  const token = localStorage.getItem('token');

  return (
    <div>
      <h1>Reviews</h1>
      {reviews.length === 0 ? (
        <p>No reviews available</p>
      ) : (
        reviews.map(review => (
          <div key={review.id}>
            <h2>{review.destination.name}</h2>
            <p>{review.comment}</p>
            <p>Rating: {review.rating} ⭐</p>
          </div>
        ))
      )}
      {!token && <p>Please <Link to="/register">register</Link> or <Link to="/login">login</Link> to add a review.</p>}
      {token && <Link to="/add-review">Add a Review</Link>}
    </div>
  );
};

export default Home;