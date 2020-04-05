import { combineReducers } from 'redux'

import todoReducer from './todo';
import countReducer from './todo';

const appReducer = combineReducers({
    todos: todoReducer,
    count: countReducer
});


export default appReducer;