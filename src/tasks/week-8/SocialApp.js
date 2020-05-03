import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import LoginPage from "./features/auth/containers/LoginPage";
import ProtectedRoute from "./features/auth/components/ProtectedRoute";

function SocialApp() {
  return (
    <div className='social-app'>
      <Router>
        <Switch>
          <Route exact path='/'>
            Welcome to the home page
          </Route>
          <Route exact path='/login'>
            <LoginPage />
          </Route>
          <ProtectedRoute exact path='/posts'>
            There are a lot of secrets
          </ProtectedRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default SocialApp;
