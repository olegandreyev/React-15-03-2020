import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo } from '../redux/actions/todo'

function TodoList() {
    const todos = useSelector(state => state.todos.items)
    const isLoading = useSelector(state => state.todos.isLoading)
    const dispatch = useDispatch();
    return (
        <div>
            {isLoading && <div>Loading..</div>}
            {todos.map(todo => (
                <div key={todo.id}>{todo.title}  ||||||  <span onClick={() => dispatch(removeTodo(todo.id))}>X</span></div>
            ))}
        </div>
    )
}


export default TodoList