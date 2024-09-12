import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Create the API slice
export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
    endpoints: (builder) => ({
        addDestination: builder.mutation({
            query: (newDestination) => ({
                url: 'destination',
                method: 'POST',
                body: newDestination,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Add token to headers
                },
            }),
        }),
        addComment: builder.mutation({
            query: ({ destinationId, comment }) => ({
              url: `/destinations/${destinationId}/comments`,
              method: 'POST',
              body: { text: comment },
            }),
          }),
          
          getDestinations: builder.query({
            query: () => 'destinations',
          }),
          addComment: builder.mutation({
            query: (newComment) => ({
              url: 'comments',
              method: 'POST',
              body: newComment,
            }),
        }),
        getDestinationById: builder.query({
            query: (id) => `destinations/${id}`,
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
    useAddDestinationMutation,
    useRegisterMutation,
    useLoginMutation,
    useAddCommentMutation
    
} = api;




