import {createApi, fakeBaseQuery, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
export const api = createApi ({
    reducePath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl:

    }),
});