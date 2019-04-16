import React, { useState } from 'react';
import css from 'styled-jsx/css';
import useFormal from '@kevinwolf/formal-web';
import * as yup from 'yup';
import Button from './Button';
import FormField from './FormField';

const { className, styles } = css.resolve`
  button {
    margin-top: 8px;
  }
`;

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
  email: yup
    .string()
    .email()
    .required(),
  displayName: yup.string().required(),
});

const SignUpForm = ({ onBack }) => {
  const formal = useFormal(
    {},
    {
      schema,
      onSubmit: values => console.log('got it!', values),
    }
  );

  return (
    <div className="signup-form">
      <h1>Sign Up</h1>

      <form {...formal.getFormProps()}>
        <FormField
          {...formal.getFieldProps('username')}
          id="username"
          placeholder="Username"
        />
        <FormField
          {...formal.getFieldProps('password')}
          id="password"
          placeholder="Password"
          type="password"
        />
        <FormField
          {...formal.getFieldProps('email')}
          id="email"
          placeholder="Email"
          type="email"
        />
        <FormField
          {...formal.getFieldProps('displayName')}
          id="displayName"
          placeholder="Display Name"
        />

        <Button primary full className={className}>
          Sign Up
        </Button>
      </form>

      <Button simple full onClick={onBack}>
        Go Back
      </Button>

      {styles}
      <style jsx>{`
        .signup-form {
          max-width: 350px;
        }

        h1 {
          margin-bottom: 16px;
          color: rgba(0, 0, 0, 0.85);
          font-size: 1.9em;
          font-weight: bold;
          line-height: 1.1em;
        }

        .signup-form form {
          display: inline;
        }
      `}</style>
    </div>
  );
};

export default SignUpForm;
