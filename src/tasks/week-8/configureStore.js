import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import currentUser from './features/auth/slices/currentUserSlice'
import authMiddleware from './features/auth/middlewares/auth'


const middleware = [...getDefaultMiddleware(), authMiddleware];

const store = configureStore({
    reducer: {
        currentUser
    },
    devTools: true,
    middleware
});

export default store;
