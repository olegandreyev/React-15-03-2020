import React from 'react';
import { reduxForm, Field } from "redux-form";
import './SignUpForm.css';
import { Button, Form, Message } from "semantic-ui-react";
import TextField from "../../../components/form/TextField";
import apiClient from "../../../api-client";


function SignUpForm({ handleSubmit, pristine, submitting, error, invalid }) {
  return (
    <div className='sign-up-form-wrapper'>
      <Form className='sign-up-form' onSubmit={handleSubmit}>
        <Form.Field>
          <label>Email</label>
          <Field name="email" component={TextField} type="text" />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <Field name="password" component={TextField} type="password" />
        </Form.Field>
        <Form.Field>
          <label>Repeat Password</label>
          <Field name="repeatPassword" component={TextField} type="password" />
        </Form.Field>
        <Form.Field>
          <label>First Name</label>
          <Field name="first_name" component={TextField} type="text" />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <Field name="last_name" component={TextField} type="text" />
        </Form.Field>
        <Form.Field>
          <label>Age</label>
          <Field name="age" component={TextField} type="number" />
        </Form.Field>
        <Button disabled={invalid || pristine || submitting}>
          Sign Up
        </Button>
      </Form>
      {error &&
      <Message error attached='bottom'>{error}</Message>
      }
    </div>
  );
}

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required!'
  } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.password) {
    errors.password = 'Required'
  }
  if (values.password !== values.repeatPassword) {
    errors.repeatPassword = 'Password Must be equal'
  }
  if (!values.first_name) {
    errors.first_name = 'Required'
  }
  if (!values.last_name) {
    errors.last_name = 'Required'
  }
  if (!values.age) {
    errors.age = 'Required'
  } else if (values.age < 18) {
    errors.age = 'Sorry, you must be at least 18 years old'
  }
  return errors;
};

const warn = values => {
  const warnings = {};
  if (values.age < 19) {
    warnings.age = 'Hmm, you seem a bit young...'
  }
  if (values?.password?.length < 6) {
    warnings.password = 'Password is too weak'
  }
  return warnings;
};

const asyncValidate = async (values) => {
  const response = await apiClient.get('/signup/check-user', { params: { email: values.email } });
  if (response.data.isUserExist) throw { email: 'This email is already taken' }
};

const ConnectedSignUpForm = reduxForm({
  form: 'signup',
  validate,
  warn,
  asyncValidate,
  asyncBlurFields: ['email']
})(SignUpForm);

export default ConnectedSignUpForm;
