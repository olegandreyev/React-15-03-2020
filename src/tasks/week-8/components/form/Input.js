import React from 'react';
import { Input, Form, Message, Label } from 'semantic-ui-react';

function TextField({
   input,
   label,
   type,
   meta: { touched, error, warning },
  ...rest
}) {

  let pointingLabelColor;
  if (error) {
    pointingLabelColor = 'red'
  } else if (warning) {
    pointingLabelColor = 'yellow'
  }
  const message = error || warning;

  return (
    <Form.Field label={label}>
      <input
        type={type}
        {...input}
        {...rest}
      >
      </input>
      {touched && message  &&
      <Label
        basic
        color={pointingLabelColor}
        pointing='above'>
        {message}
      </Label>
      }
    </Form.Field>
  );
}

export default TextField;
