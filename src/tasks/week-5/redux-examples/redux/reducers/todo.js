import { ADD_TODO_SUCCESS, REMOVE_TODO, UPDATED_TODO, ADD_TODO_LOADING } from '../actions/todo';

const initialState = {
    isLoading: false,
    items: [
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
}



export default function todoReducer(state = initialState, action) {
    switch(action.type) {
        case ADD_TODO_SUCCESS: 
            return {
                ...state,
                items: [action.payload, ...state.items],
                isLoading: false
            }
        case REMOVE_TODO:
            return {
                ...state,
                items: state.items.filter(todo => todo.id !== action.payload)
            }
        case UPDATED_TODO:
            return {
                ...state,
                items: state.items.map(todo => todo.id === action.payload.id ? { ...todo, ...action.payload } : todo)    
            }
        case ADD_TODO_LOADING: 
            return {
                ...state,
                isLoading: true
            }        
        default: return state;    
    }
}
