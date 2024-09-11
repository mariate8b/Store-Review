import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



function Review() {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const [destinationId, setDestinationId] = useState('');
  const [token] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/reviews', { rating, comment, destinationId, token });
    alert('Review added');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} required />
      <textarea placeholder="Comment" value={comment} onChange={(e) => setComment(e.target.value)} required />
      <input type="text" placeholder="Destination ID" value={destinationId} onChange={(e) => setDestinationId(e.target.value)} required />
      <button type="submit">Add Review</button>
    </form>
  );
}

export default Review;