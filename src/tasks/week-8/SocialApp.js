import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "./features/auth/slices/currentUserSlice";
import { Container, Header } from "semantic-ui-react";

/* routes */
import SignInPage from "./features/auth/containers/SignInPage";
import HomePage from "./features/home/containers/HomePage";
import NotFoundPage from "./components/404";
import ProtectedRoute from "./components/ProtectedRoute";
import { getCurrentUser } from "./features/auth/selectors/currentUser";
import NotAuthorizedNavbar from "./components/NotAuthorizedNavbar";
import AuthorizedNavbar from "./components/AuthorizedNavbar";
import PostsPage from "./features/posts/containers/PostsPage";
import UsersPage from "./features/users/containers/UsersPage";
import SignUpPage from "./features/signup/containers/SignUpPage";

function SocialApp() {
  const currentUser = useSelector(getCurrentUser);
  const dispatch = useDispatch();
  const [hasUserRequested, setUserRequested] = useState(false);
  // fetch current user if possible
  useEffect(() =>{
      dispatch(fetchCurrentUser())
        .then(() => setUserRequested(true))
        .catch(() => setUserRequested(true))
  }
, [dispatch]);
  if (!hasUserRequested) return null;
  return (
    <Container className='social-app'>
      <Router>
        <Header>
          <NavLink to='/' activeClassName='active-nav'>Social app</NavLink>
        </Header>
        {!currentUser && <NotAuthorizedNavbar />}
        {currentUser && <AuthorizedNavbar /> }
        <Switch>
          <Route path='/' exact>
            <HomePage />
          </Route>
          <Route path='/sign-in' exact>
            <SignInPage />
          </Route>
          <Route path='/sign-up' exact>
            <SignUpPage />
          </Route>
          <ProtectedRoute path='/posts' exact>
            <PostsPage />
          </ProtectedRoute>
          <ProtectedRoute path='/users' exact>
            <UsersPage />
          </ProtectedRoute>
          <Route path='*' component={NotFoundPage} />
        </Switch>
      </Router>
    </Container>
  );
}

export default SocialApp;
