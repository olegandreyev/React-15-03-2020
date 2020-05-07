import React from 'react';
import { reduxForm, Field } from 'redux-form'
import { Button, Form, Input } from "semantic-ui-react";
import './SignUpForm.css'

function SignUpForm({ handleSubmit, pristine, submitting }) {
  return (
    <Form className='sign-up-form' onSubmit={handleSubmit}>
      <Form.Field>
        <label>Email</label>
        <Field name='email' component={Input} type='text' placeholder='John.Doe@gmail.com' />
      </Form.Field>
      <Form.Field>
        <label>Password</label>
        <Field name='password' component={Input} type='password' placeholder='******' />
      </Form.Field>
      <Form.Field>
        <label>Repeat Password</label>
        <Field name='repeatPassword' component={Input} type='password' placeholder='******' />
      </Form.Field>
      <Form.Field>
        <label>First Name</label>
        <Field name='first_name' component={Input} type='text' placeholder='John' />
      </Form.Field>
      <Form.Field>
        <label>Last Name</label>
        <Field name='last_name' component={Input} type='text' placeholder='Doe' />
      </Form.Field>
      <Form.Field>
        <label>Age</label>
        <Field name='age' component={Input} type='number' placeholder='33' />
      </Form.Field>
      <Button disabled={pristine || submitting} type='submit'>Sign Up</Button>
    </Form>
  );
}

export default reduxForm({
  form: 'signup'
})(SignUpForm);
