import React from 'react';
import { reduxForm, Field } from 'redux-form'
import { Button, Form } from "semantic-ui-react";
import './SignUpForm.css'
import TextField from "../../../components/form/Input";
import apiClient from "../../../api-client";

function SignUpForm({ handleSubmit, pristine, submitting }) {
  return (
    <Form className='sign-up-form' onSubmit={handleSubmit}>
      <Form.Field>
        <label>Email</label>
        <Field name='email' component={TextField} type='text' placeholder='John.Doe@gmail.com' />
      </Form.Field>
      <Form.Field>
        <label>Password</label>
        <Field name='password' component={TextField} type='password' placeholder='******' />
      </Form.Field>
      <Form.Field>
        <label>Repeat Password</label>
        <Field name='repeatPassword' component={TextField} type='password' placeholder='******' />
      </Form.Field>
      <Form.Field>
        <label>First Name</label>
        <Field name='first_name' component={TextField} type='text' placeholder='John' />
      </Form.Field>
      <Form.Field>
        <label>Last Name</label>
        <Field name='last_name' component={TextField} type='text' placeholder='Doe' />
      </Form.Field>
      <Form.Field>
        <label>Age</label>
        <Field name='age' component={TextField} type='number' placeholder='33' />
      </Form.Field>
      <Button disabled={pristine || submitting} type='submit'>Sign Up</Button>
    </Form>
  );
}

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.age) {
    errors.age = 'Required'
  } else if (isNaN(Number(values.age))) {
    errors.age = 'Must be a number'
  } else if (Number(values.age) < 18) {
    errors.age = 'Sorry, you must be at least 18 years old'
  }
  if (!values.first_name) {
    errors.first_name = 'Required'
  }
  if (!values.last_name) {
    errors.last_name = 'Required'
  }

  if (!values.password) {
    errors.password = 'Required'
  }
  if (values.password !== values.repeatPassword) {
    errors.repeatPassword = 'Password must be equal'
  }
  return errors
};

const asyncValidate = async (values /*, dispatch */) => {
  const response = await apiClient.get('/api/check-user', { params: { email: values.email } });
  if (response.data.isUserExist) throw { email: 'This email is already taken' };
};

export default reduxForm({
  form: 'signup',
  validate,
  asyncValidate,
  asyncBlurFields: ['email']
})(SignUpForm);
