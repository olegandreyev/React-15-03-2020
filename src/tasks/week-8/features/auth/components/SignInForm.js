import React from 'react';
import { Button, Form, Message } from 'semantic-ui-react';
import { reduxForm, Field } from "redux-form";
import './SignInForm.css';

function SignInForm({ handleSubmit, pristine, submitting, error }) {
  return (
    <div className='sign-in-form-wrapper'>
      <Form className='sign-in-form' onSubmit={handleSubmit}>
        <Form.Field>
          <label>Email</label>
          <Field name="email" component="input" type="text" />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <Field name="password" component="input" type="password" />
        </Form.Field>
        <Button disabled={pristine || submitting}>Sign In</Button>
      </Form>
      {error &&
      <Message error attached='bottom'>{error}</Message>
      }
    </div>
  );
}

const ConnectedSignInForm = reduxForm({
  form: 'signin'
})(SignInForm);

export default ConnectedSignInForm;
