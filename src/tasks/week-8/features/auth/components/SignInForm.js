import React from 'react';
import { Form, Button, Input } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form'
import './SignInForm.css';


const SignInForm = ({ handleSubmit, pristine, submitting }) => (
  <Form className='sign-in-form' onSubmit={handleSubmit}>
    <Form.Field>
      <label>Email</label>
      <Field name='email' component={Input} type='text' placeholder='John.Doe@gmail.com' />
    </Form.Field>
    <Form.Field>
      <label>Password</label>
      <Field name='password' component={Input} type='password' placeholder='******' />
    </Form.Field>
    <Button disabled={pristine || submitting} type='submit'>Sign In</Button>
  </Form>
);

export default reduxForm({
  form: 'auth'
})(SignInForm);