import React, { useState } from 'react';
import { useGetDestinationsQuery, useAddCommentMutation, useGetCommentsQuery } from '../redux/api';

const DestinationsList = () => {
  const { data: destinations = [], error, isLoading } = useGetDestinationsQuery();
  const [selectedDestinationId, setSelectedDestinationId] = useState(null);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [addComment, { isLoading: isCommentLoading, error: commentError }] = useAddCommentMutation();

  // Fetch comments for the selected destination
  const { data: comments = [], isLoading: isCommentsLoading } = useGetCommentsQuery(selectedDestinationId, {
    skip: !selectedDestinationId, // Skip if no destination is selected
  });

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
      alert('Failed to add comment. Please try again.');
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="DestinationList">
      <h1>Destinations List</h1>
      {destinations.map((destination) => (
        <div key={destination.id} style={{ marginBottom: '20px' }}>
          <h2>{destination.name}</h2>
          {destination.picture && <img src={destination.picture} alt={destination.name} style={{ width: '300px', height: '200px' }} />}
          <p>{destination.review}</p>

          <div>
            <h3>Comments:</h3>
            {isCommentsLoading ? (
              <p>Loading comments...</p>
            ) : (
              comments.map(comment => (
                <div key={comment.id}>
                  <p><strong>{comment.name}:</strong> {comment.comment}</p>
                </div>
              ))
            )}
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
            {selectedDestinationId === destination.id ? 'Cancel' : 'Drop your opinion'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default DestinationsList;







