import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import currentUser from './features/auth/slices/currentUserSlice'
import authMiddleware from './features/auth/middlewares/auth'
import { reducer as formReducer } from 'redux-form'


const middleware = [...getDefaultMiddleware(), authMiddleware];

const store = configureStore({
    reducer: {
        currentUser,
        form: formReducer
    },
    devTools: true,
    middleware
});

export default store;
