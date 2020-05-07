import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink, withRouter } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "./features/auth/slices/currentUserSlice";
import { Container, Header, Menu } from "semantic-ui-react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

/* routes */
import LoginPage from "./features/auth/containers/LoginPage";
import HomePage from "./features/home/containers/HomePage";
import NotFoundPage from "./components/404";
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
        <Route path='/login' exact component={LoginPage} />
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
          <NavLink to='/login' className='item' activeClassName='active-nav'>Login</NavLink>
        </Menu>
        <AnimatedSwitch />
      </Router>
    </Container>
  );
}

export default SocialApp;
