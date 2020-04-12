const { createStore, applyMiddleware } = require('redux');

const loggerMiddleware = store => next => action => {
    console.log('---------------------')
    console.log(store.getState(), 'previous state');
    console.log(action, 'action')
    next(action);
    console.log(store.getState(), 'next state');
    console.log('---------------------')   
}

const asyncMiddleware = store => next => action => {
    if (typeof action === 'function') {
        return action(store.dispatch.bind(store), store.getState.bind(store));
    }
    return next(action);
}

function increment() {
    return {
        type: 'INCREMENT'
    }
}


function asyncIncrement() {
    return (dispatch, getState) => {
        const currentState = getState();
        if (currentState > 0) return;
        dispatch({
            type: 'ASYNC_INCREMENT_START'
        })
        setTimeout(() => {
          dispatch(increment())
        }, 3000)
    }
}


function decrement() {
    return {
        type: 'DECREMENT'
    }
}

function countReducer(state = 0, action) {
    if (action.type === 'INCREMENT') {
        return state + 1;
    } else if (action.type === 'DECREMENT') {
        return state - 1;
    } else if (action.type === 'ASYNC_INCREMENT_START') {
        return -1000
    } else if (action.type === 'ASYNC_INCREMENT_ERROR') {
        return 0
    }
    return state;
}

const store = createStore(countReducer, applyMiddleware(asyncMiddleware, loggerMiddleware));

store.dispatch(increment())
store.dispatch(increment())
store.dispatch(decrement())
store.dispatch(asyncIncrement())