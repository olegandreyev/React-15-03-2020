export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS'
export const ADD_TODO_LOADING = 'ADD_TODO_LOADING'
export const REMOVE_TODO = 'REMOVE_TODO'
export const UPDATED_TODO = 'UPDATED_TODO'

function timeout(ms) {
    return new Promise((res) => {
        setTimeout(res, ms)
    })
}

const addTodo = newTodo => {
    return {
        type: ADD_TODO_SUCCESS,
        payload: newTodo
    }
}

export const addTodoAsync = newTodo => async dispatch => {
    dispatch({
        type: ADD_TODO_LOADING
    })
    await timeout(3000);
    dispatch(addTodo(newTodo))
}

export const removeTodo = removedId => {
    return {
        type: REMOVE_TODO,
        payload: removedId
    }
}
export const updateTodo = updatedTodo => {
    return {
        type: UPDATED_TODO,
        payload: updatedTodo
    }
}
