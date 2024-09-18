import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const token = localStorage.getItem('token');
// Create the API slice
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api',
    prepareHeaders: (headers) => {
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getDestinations: builder.query({
      query: () => 'destinations',
    }),
    getDestinationById: builder.query({
      query: (id) => `destinations/${id}`,
    }),
    
    // Fetch comments for a specific destination
    getComments: builder.query({
      query: (destinationId) => `destinations/${destinationId}/comments`,
    }),
    // Add a comment to a specific destination
    addComment: builder.mutation({
      query: ({ destinationId, comment, name }) => ({
        url: `destinations/${destinationId}/comments`,
        method: 'POST',
        body: { comment, name },
      }),
    }),
    // Add a review to a specific destination
addReview: builder.mutation({
  query: ({ destinationId, review, picture }) => ({
    url: `destinations/${destinationId}/reviews`,
    method: 'POST',
    body: { review, picture },
  }),
}),
register: builder.mutation({
  query: (newUser) => ({
    url: 'register',
    method: 'POST',
    body: newUser,
  }),
}),


    login: builder.mutation({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

// Export hooks for endpoints
export const {
  useGetDestinationsQuery,
  useGetDestinationByIdQuery,
  useAddReviewMutation,
  useAddCommentMutation,
  useRegisterMutation,
  useLoginMutation,
  useGetCommentsQuery // Make sure this is included
} = api;







