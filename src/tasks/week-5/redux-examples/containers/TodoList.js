import React from 'react'
import { connect } from 'react-redux';
import { removeTodo } from '../redux/actions/todo'

function TodoList({ todos, isLoading, dispatch }) {
    return (
        <div>
            {isLoading && <div>Loading..</div>}
            {todos.map(todo => (
                <div key={todo.id}>{todo.title}  ||||||  <span onClick={() => dispatch(removeTodo(todo.id))}>X</span></div>
            ))}
        </div>
    )
}

const mapStateToProps = state => ({
    todos: state.todos.items,
    isLoading: state.todos.isLoading
})


export default connect(
    mapStateToProps
)(TodoList)