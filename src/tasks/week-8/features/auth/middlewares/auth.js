import { signIn, logout } from '../slices/currentUserSlice'
import apiClient from "../../../api-client";

const authMiddleware = store => next => action => {
    if (action.type === signIn.toString()) {
        const { authToken } = action.payload;
        localStorage.setItem('authToken', authToken);
        apiClient.defaults.headers['Authorization'] = `Bearer ${authToken}`;
    }
    if (action.type === logout.toString()) {
        localStorage.clear();
        delete apiClient.defaults.headers['Authorization'];
    }

    next(action);
};

export default authMiddleware
