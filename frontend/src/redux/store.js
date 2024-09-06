import { configureStore } from '@reduxjs/toolkit'
import {api} from "./api";

export default configureStore({
    reducer:{
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaulMiddleware) =>
        getDefaulMiddleware ().concat(api.middleware),
});