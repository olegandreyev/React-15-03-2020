import React from 'react'
import store from './redux/store'
import ReduxContext from './contexts/ReduxContext';
import TodoList from './containers/TodoList';
import AddTodoForm from './containers/AddTodoForm';

export default function App() {
    return (
        <ReduxContext.Provider value={store}>
            <AddTodoForm />
            <TodoList />    
        </ReduxContext.Provider>
    )
}
