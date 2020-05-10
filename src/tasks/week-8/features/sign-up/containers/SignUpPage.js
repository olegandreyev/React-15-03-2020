import React, { useCallback, useState }  from 'react';
import { Container, Message } from "semantic-ui-react";
import SignUpForm from "../components/SignUpForm";
import apiClient from "../../../api-client";
import { SubmissionError } from "redux-form";

function SignUpPage() {
  const [isCompleted, setIsCompleted] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState(null);

  const submitSignUpForm = useCallback(values =>
    apiClient.post('/signup', values).then(() => {
      setIsCompleted(true)
      setRegisteredEmail(values.email)
    }).catch(err => {
      throw new SubmissionError({ _error: err.response.data.message })
    }),
    []);

  return (
    <Container className='signup-page'>
      {!isCompleted && <SignUpForm onSubmit={submitSignUpForm} /> }
      {isCompleted &&
      <Message
        success
        header='Your user registration was successful'
        content={<div>Please confirm your email address <strong>{registeredEmail}</strong></div>}
      />}
    </Container>
  );
}

export default SignUpPage;
