// redux/api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Create the API slice
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
  endpoints: (builder) => ({
    getDestinations: builder.query({
      query: () => 'destinations',
    }),
    getDestinationById: builder.query({
      query: (id) => `destinations/${id}`,
    }),
    addReview: builder.mutation({
      query: ({ id, review }) => ({
        url: `destinations/${id}/reviews`,
        method: 'POST',
        body: review,
      }),
    }),
    addComment: builder.mutation({
      query: ({ reviewId, comment }) => ({
        url: `reviews/${reviewId}/comments`,
        method: 'POST',
        body: comment,
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
export const { useGetDestinationsQuery, useGetDestinationByIdQuery, useAddReviewMutation, useAddCommentMutation, useRegisterMutation, useLoginMutation } = api;




