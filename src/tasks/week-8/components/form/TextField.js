import React from 'react'
import { Form, Label } from 'semantic-ui-react';

function TextField({
  input,
  label,
  type,
  meta: { touched, error, warning },
  ...rest
}) {

  let labelColor;

  if(error) {
    labelColor = 'red'
  } else if (warning) {
    labelColor = 'yellow'
  }
  const message = error || warning;
  return (
    <Form.Field>
      <input
        type={type}
        {...input}
        {...rest}
      />
      {touched && message &&
      <Label
        basic
        color={labelColor}
        pointing='above'
      >
        {message}
      </Label>
      }
    </Form.Field>
  )
}

export default TextField;

