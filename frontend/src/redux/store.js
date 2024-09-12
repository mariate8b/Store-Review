// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';

export default configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
