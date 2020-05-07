import React from 'react';
import { Input, Form } from 'semantic-ui-react';

function TextField({
   input,
   label,
   type,
   meta: { touched, error, warning },
  ...rest
}) {
  return (
    <Form.Field
      control={Input}
      type={type}
      label={label}
      error={error && touched && {
        content: error,
        pointing: 'below',
      }}
      {...input}
      {...rest}
    />
  );
}

export default TextField;
