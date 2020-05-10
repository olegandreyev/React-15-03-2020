import React, { useState } from 'react';
import { Container, Message } from "semantic-ui-react";
import SignUpForm from "../components/SignUpForm";
import apiClient from "../../../api-client";

function SignUpPage() {

  const [hasSignUpCompleted, setSignUpCompleted] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState(false);

  const submitForm = values => {
    apiClient.post('/signup', values).then(() => {
      setSignUpCompleted(true);
      setRegisteredEmail(values.email);
    })
  };
  return (
    <Container className='sign-up-page'>
      {!hasSignUpCompleted && <SignUpForm onSubmit={submitForm} /> }
      { hasSignUpCompleted &&
      <Message
        success
        header='Your user registration was successful'
        content={<div>Please confirm your email address <strong>{registeredEmail}</strong></div>}
      >
      </Message>
      }
    </Container>
  );
}

export default SignUpPage;
