export const ADD_TODO = 'ADD_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const UPDATED_TODO = 'UPDATED_TODO'

export const addTodo = newTodo => {
    return {
        type: ADD_TODO,
        payload: newTodo
    }
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
