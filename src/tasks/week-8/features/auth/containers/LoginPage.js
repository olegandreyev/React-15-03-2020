import React, { useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { signIn } from "../slices/currentUserSlice";
import LoginForm from '../components/LoginForm';
import apiClient from "../../../api-client";
import { Container } from "semantic-ui-react";

function LoginPage() {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { from } = location.state || { from: { pathname: "/" } };

  const submitForm = useCallback(credentials => {
    return apiClient.post('/auth', credentials)
      .then(response => dispatch(signIn(response.data)))
      .then(() => history.replace(from));
  }, []);

  return (
    <Container className='login-page'>
      <LoginForm onSubmit={submitForm} />
    </Container>
  );
}

export default LoginPage;
