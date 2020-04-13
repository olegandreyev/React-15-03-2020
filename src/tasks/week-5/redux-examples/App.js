import React from 'react'
import { Provider } from 'react-redux'
import store from './redux/store'
// import ReduxContext from './contexts/ReduxContext';
import TodoList from './containers/TodoList';
import AddTodoForm from './containers/AddTodoForm';

export default function App() {
    return (
        <Provider store={store}>
            <AddTodoForm />
            <TodoList />    
        </Provider>
    )
}
