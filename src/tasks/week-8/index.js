import React from 'react';
import { Provider } from 'react-redux'
import SocialApp from "./SocialApp";
import store from './configureStore';

function App() {
  return (
    <Provider store={store}>
      <SocialApp />
    </Provider>
  );
}

export default App;
