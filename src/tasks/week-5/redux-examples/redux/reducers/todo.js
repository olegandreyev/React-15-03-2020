import { ADD_TODO, REMOVE_TODO, UPDATED_TODO } from '../actions/todo';

const initialState = [
    {
        id: 1,
        title: 'Walk the dog',
        completed: false
    },
    {
        id: 2,
        title: 'Make a dinner',
        completed: false
    }
]


export default function todoReducer(state = initialState, action) {
    switch(action.type) {
        case ADD_TODO: 
            return [action.payload, ...state];
        case REMOVE_TODO:
            return state.filter(todo => todo.id !== action.payload)  
        case UPDATED_TODO:
            return state.map(todo => todo.id === action.payload.id ? { ...todo, ...action.payload } : todo)    
        default: return state;    
    }
}
