import { combineReducers } from 'redux'

import todoReducer from './todo';
import countReducer from './count';

const appReducer = combineReducers({
    todos: todoReducer,
    count: countReducer
});


export default appReducer;