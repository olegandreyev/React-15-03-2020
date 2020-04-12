import React from 'react'
import { Provider } from 'react-redux';
import store from './redux/configureStore';
import AsyncApp from './AsyncApp';

export default function RedditApp() {
    return (
        <Provider store={store}>
            <AsyncApp />
        </Provider>
    )
}
