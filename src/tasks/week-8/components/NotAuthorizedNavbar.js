import React from 'react';
import { NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react";

function NotAuthorizedNavbar(props) {
  return (
    <Menu>
      <NavLink to='/sign-in' className='item' activeClassName='active-nav'>Sign In</NavLink>
      <NavLink to='/sign-up' className='item' activeClassName='active-nav'>Sign Up</NavLink>
    </Menu>
  );
}

export default NotAuthorizedNavbar;
