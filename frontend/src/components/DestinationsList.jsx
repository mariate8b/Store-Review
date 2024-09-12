import React, { useState } from 'react';
import { useGetDestinationsQuery, useAddCommentMutation } from '../redux/api';

const DestinationsList = () => {
 
  const { data: destinations = [], error, isLoading } = useGetDestinationsQuery();
  const [selectedDestinationId, setSelectedDestinationId] = useState(null);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [addComment, { isLoading: isCommentLoading, error: commentError }] = useAddCommentMutation();

  const handleAddComment = async (destinationId) => {
    if (!name) {
      alert('Name is required');
      return;
    }
    if (!comment) {
      alert('Comment cannot be empty');
      return;
    }
    try {
      await addComment({ destinationId, comment, name }).unwrap();
      setComment('');
      setName('');
      setSelectedDestinationId(null);
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Destinations List</h1>
      {destinations.map((destination) => (
        <div key={destination.id} style={{ marginBottom: '20px' }}>
          <h2>{destination.name}</h2>
          <img src={destination.picture} alt={destination.name} style={{ width: '300px', height: '200px' }} />
          <p>{destination.review}</p>

          {/* Display existing comments */}
          <div>
            <h3>Comments:</h3>
            {destination.comments && destination.comments.map((comment) => (
              <div key={comment.id} style={{ marginBottom: '10px' }}>
                <p>{comment.comment}</p>
                <p><strong>{comment.name}</strong></p>
              </div>
            ))}
          </div>

          {/* Comment Input */}
          {selectedDestinationId === destination.id && (
            <div>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <textarea
                placeholder="Add your comment here"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                onClick={() => handleAddComment(destination.id)}
                disabled={isCommentLoading}
              >
                Add Comment
              </button>
              {commentError && <p>Error: {commentError.message}</p>}
            </div>
          )}

          <button onClick={() => setSelectedDestinationId(destination.id)}>
            {selectedDestinationId === destination.id ? 'Cancel' : 'Add Comment'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default DestinationsList;


