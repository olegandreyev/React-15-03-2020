import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink, withRouter } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "./features/auth/slices/currentUserSlice";
import { Container, Header, Menu } from "semantic-ui-react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

/* routes */
import SignInPage from "./features/auth/containers/SignInPage";
import HomePage from "./features/home/containers/HomePage";
import NotFoundPage from "./components/404";
import SignUpPage from "./features/sign-up/containers/SignUpPage";
import ProtectedRoute from "./components/ProtectedRoute";


const AnimatedSwitch = withRouter(({ location }) => (
  <TransitionGroup>
    <CSSTransition
      key={location.pathname.includes('/users/') ? undefined : location.key}
      classNames="fade"
      timeout={250}
    >
      <Switch location={location}>
        <Route path='/' exact component={HomePage} />
        <Route path='/sign-in' exact component={SignInPage} />
        <Route path='/sign-up' exact component={SignUpPage} />
        <Route path='*' component={NotFoundPage} />
      </Switch>
    </CSSTransition>
  </TransitionGroup>
));

function SocialApp() {
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
        <Menu>
          <NavLink to='/sign-in' className='item' activeClassName='active-nav'>Sign In</NavLink>
          <NavLink to='/sign-up' className='item' activeClassName='active-nav'>Sign Up</NavLink>
        </Menu>
        <AnimatedSwitch />
      </Router>
    </Container>
  );
}

export default SocialApp;
