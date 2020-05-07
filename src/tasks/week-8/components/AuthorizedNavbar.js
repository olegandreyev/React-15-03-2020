import React from 'react';
import { Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/slices/currentUserSlice";

function AuthorizedNavbar() {
  const dispatch = useDispatch();
  return (
    <Menu>
      <NavLink to='/posts' className='item' activeClassName='active-nav'>Posts</NavLink>
      <NavLink to='/users' className='item' activeClassName='active-nav'>Users</NavLink>
      <Menu.Menu position='right'>
        <Menu.Item onClick={() => dispatch(logout())}>Logout</Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}

export default AuthorizedNavbar;
