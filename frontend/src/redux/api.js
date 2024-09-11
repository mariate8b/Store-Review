import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: '/http://localhost:5173' }), // Adjust base URL if needed
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (newUser) => ({
                url: 'register',
                method: 'POST',
                body: newUser,
            }),
        }),
    }),
});

export const { useRegisterMutation } = api;
export const { useGetDestinationByIdQuery } = api;
export const {useAddReviewMutation} = api;



