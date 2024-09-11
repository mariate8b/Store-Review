
import React, { useState } from 'react';
import { useGetDestinationsQuery, useGetDestinationByIdQuery, useAddReviewMutation } from '../redux/api.js';
import { Link, useParams } from 'react-router-dom';

const Destination = () => {
    const { data: destinations, error, isLoading } = useGetDestinationsQuery();
    const [selectedDestinationId, setSelectedDestinationId] = useState(null);
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);
    const [addReview] = useAddReviewMutation();
    const { id } = useParams();
    const { data: destination, isFetching } = useGetDestinationByIdQuery(id, { skip: !id });

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (selectedDestinationId) {
            try {
                await addReview({ id: selectedDestinationId, review: { user: 'Anonymous', comment: review, rating } });
                setReview("");
                setRating(0);
                // Optionally, refetch destination data to update the UI
            } catch (error) {
                console.error('Failed to submit review:', error);
            }
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h1>Destinations</h1>
            <ul>
                {destinations.map(destination => (
                    <li key={destination._id}>
                        <Link to={`/destinations/${destination._id}`} onClick={() => setSelectedDestinationId(destination._id)}>
                            {destination.name}
                        </Link>
                    </li>
                ))}
            </ul>

            {id && !isFetching && destination && (
                <div>
                    <h2>{destination.name}</h2>
                    <p>{destination.description}</p>
                    <h3>Reviews</h3>
                    <ul>
                        {destination.reviews.map((review, index) => (
                            <li key={index}>
                                <strong>{review.user}</strong>: {review.comment} ({review.rating}/5)
                            </li>
                        ))}
                    </ul>
                    <form onSubmit={handleReviewSubmit}>
                        <h3>Leave a Review</h3>
                        <textarea
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            placeholder="Your comment"
                            required
                        />
                        <input
                            type="number"
                            value={rating}
                            onChange={(e) => setRating(parseInt(e.target.value))}
                            min="1"
                            max="5"
                            placeholder="Rating (1-5)"
                            required
                        />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Destination;
