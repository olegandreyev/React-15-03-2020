import React, { useState, useCallback} from 'react'
import { connect } from 'react-redux';
import { addTodoAsync } from '../redux/actions/todo'

function AddTodoForm({ addNewTodo }) {
    const [title, setTitle] = useState('');

    const save = useCallback(() => {
        addNewTodo({
            id: Date.now(),
            title,
            completed: false
        })
        setTitle('')
    }, [title, addNewTodo])

    return (
        <div>
            <input value={title} onChange={e => setTitle(e.target.value)} type="text"/>
            <button onClick={save}>Add Todo</button>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    addNewTodo: newTodo => dispatch(addTodoAsync(newTodo))
})


AddTodoForm = connect(null, mapDispatchToProps)(AddTodoForm);

export default AddTodoForm;
