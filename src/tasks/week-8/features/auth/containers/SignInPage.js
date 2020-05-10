import React, { useCallback, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { signIn } from "../slices/currentUserSlice";
import apiClient from "../../../api-client";
import { Container } from "semantic-ui-react";
import SignInForm from '../components/SignInForm';
import { SubmissionError } from "redux-form";

function SignInPage() {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { from } = location.state || { from: { pathname: "/" } };

  const submitForm = useCallback(values => {
    return apiClient.post('/auth', values)
      .then(response => dispatch(signIn(response.data)))
      .then(() => history.replace(from))
      .catch(err => {
        throw new SubmissionError({ _error: err.response.data.message });
      })
  }, []);

  return (
    <Container className='login-page'>
      <SignInForm onSubmit={submitForm} />
    </Container>
  );
}

export default SignInPage;
