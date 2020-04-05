const { createStore, combineReducers } = require('redux');

const INCEREMENT = 'INCEREMENT';
const DECREMENT = 'DECREMENT';

const increment = () => ({ type: INCEREMENT })
const decrement = () => ({ type: DECREMENT })


function countReducer(state = 0, action) {
    switch(action.type) {
        case INCEREMENT:
            return state + 1;
        case DECREMENT:
            return state - 1;
        default: return state        
    }
}


const store = createStore(countReducer);


store.subscribe(function () {
    console.log(store.getState(), 'store has changed')
})

// store.dispatch({
//     type: INCEREMENT // count = 1;
// })
// store.dispatch({
//     type: INCEREMENT // count = 2;
// })
// store.dispatch({
//     type: INCEREMENT // count = 3;
// })
// store.dispatch({
//     type: DECREMENT  // count = 2;
// })

const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const UPDATED_TODO = 'UPDATED_TODO'

const addTodo = newTodo => {
    return {
        type: ADD_TODO,
        payload: newTodo
    }
}
const removeTodo = removedId => {
    return {
        type: REMOVE_TODO,
        payload: removedId
    }
}
const updateTodo = updatedTodo => {
    return {
        type: UPDATED_TODO,
        payload: updatedTodo
    }
}

function todoReducer(state = [], action) {
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

const appStore = createStore(combineReducers({
    todos: todoReducer,
    count: countReducer
}))

appStore.dispatch(increment())
appStore.dispatch(increment())
appStore.dispatch(increment())
appStore.dispatch(increment())
appStore.dispatch(increment())

appStore.dispatch(addTodo({
    id: 1,
    title: 'Some title',
    completed: false
}))

appStore.dispatch(addTodo({
    id: 2,
    title: 'Drink Water',
    completed: false
}))

appStore.dispatch(decrement())

console.log(appStore.getState().count)