import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import authMiddleware from "./features/auth/middlewares/auth";
import currentUser from './features/auth/slices/currentUserSlice';

const middleware = [
  ...getDefaultMiddleware(),
  authMiddleware
];

const store = configureStore({
  reducer: {
    currentUser
  },
  devTools: true,
  middleware,
});

export default store;

