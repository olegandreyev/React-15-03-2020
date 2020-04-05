import React from 'react'
import connect from '../hoc/connect';
import { removeTodo } from '../redux/actions/todo'

function TodoList({ todos, removeTodo }) {
    return (
        <div>
            {todos.map(todo => (
                <div key={todo.id}>{todo.title}  ||||||  <span onClick={() => removeTodo(todo.id)}>X</span></div>
            ))}
        </div>
    )
}

// selector
const mapStateToProps = state => ({
    todos: state.todos
})
// actions
const mapDispatchToProps = dispatch => ({
    removeTodo: id => dispatch(removeTodo(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)