import React, { useCallback, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { signIn } from "../slices/currentUserSlice";
import apiClient from "../../../api-client";
import { Container } from "semantic-ui-react";
import { SubmissionError } from "redux-form";

function SignInPage() {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { from } = location.state || { from: { pathname: "/" } };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitForm = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
    return apiClient.post('/auth', {email, password})
      .then(response => dispatch(signIn(response.data)))
      .then(() => history.replace(from))
      .catch(err => {
        alert(err.response.data.message)
      })
  }, [email, password]);

  return (
    <Container className='login-page'>
      <form onSubmit={submitForm}>
        <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <input type="submit" value='Sign in'/>
      </form>
    </Container>
  );
}

export default SignInPage;
