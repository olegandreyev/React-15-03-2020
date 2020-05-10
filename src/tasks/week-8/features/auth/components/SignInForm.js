import React from 'react';
import { Form, Button, Message, Container } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form'
import './SignInForm.css';
import TextField from "../../../components/form/Input";


const SignInForm = ({ handleSubmit, pristine, submitting, error }) => (
  <div className='sign-in-form-wrapper'>
    <Form className='sign-in-form' onSubmit={handleSubmit}>
      <Form.Field>
        <label>Email</label>
        <Field name='email' component={TextField} type='text' placeholder='John.Doe@gmail.com' />
      </Form.Field>
      <Form.Field>
        <label>Password</label>
        <Field name='password' component={TextField} type='password' placeholder='******' />
      </Form.Field>
      <Button disabled={pristine || submitting} type='submit'>Sign In</Button>
    </Form>
    {error &&
    <Message attached='bottom' error>
      {error}
    </Message>
    }
  </div>
);

export default reduxForm({
  form: 'auth'
})(SignInForm);
