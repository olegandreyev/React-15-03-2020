import React from 'react'
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { withRouter } from 'react-router-dom'
import './blog-v2.css'
import { Container, Header, Menu } from 'semantic-ui-react'
import { BrowserRouter as Router, Switch, NavLink, Route } from 'react-router-dom';
import HomePage from './containers/HomePage';
import PostsPage from './containers/PostsPage';
import UsersPage from './containers/UsersPage';
import AlbumsPage from './containers/AlbumsPage';
import UserPage from './containers/UserPage';
import NotFoundPage from './containers/404';

const AnimatedSwitch = withRouter(({ location }) => (
    <TransitionGroup>
      <CSSTransition 
        key={location.pathname.includes('/users/') ? undefined : location.key} 
        classNames="fade" 
        timeout={250}
      >
        <Switch location={location}>
            <Route path='/' exact component={HomePage} />
            <Route path='/posts' exact component={PostsPage} />
            <Route path='/users' exact component={UsersPage} />
            <Route path='/users/:userId' component={UserPage} />
            <Route path='/albums' exact component={AlbumsPage} />
            <Route path='*' component={NotFoundPage} />
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  ));

export default function Blog() {
    return (
        <Container>
            <Router>
                <Header>
                    <NavLink to='/' activeClassName='active-nav'>Blog V2</NavLink>
                </Header>
                <Menu>
                    <NavLink to='/posts' className='item' activeClassName='active-nav'>Posts</NavLink>
                    <NavLink to='/users' className='item' activeClassName='active-nav'>Users</NavLink>
                    <NavLink to='/albums' className='item' activeClassName='active-nav'>Albums</NavLink>
                </Menu>
                <AnimatedSwitch />
            </Router>
        </Container>
    )
}
