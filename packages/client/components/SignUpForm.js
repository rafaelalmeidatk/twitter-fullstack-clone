import React, { useState } from 'react';
import css from 'styled-jsx/css';
import useFormal from '@kevinwolf/formal-web';
import * as yup from 'yup';
import gql from 'graphql-tag';
import { useMutation } from 'react-apollo-hooks';

import { loginRequest, login } from '../lib/auth';
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

const REGISTER_USER_QUERY = gql`
  mutation RegisterUser($input: RegisterUserInput!) {
    registerUser(input: $input) {
      id
      username
      email
      name
    }
  }
`;

const SignUpForm = ({ onBack }) => {
  const [registerError, setRegisterError] = useState(null);
  const registerUser = useMutation(REGISTER_USER_QUERY);

  const formal = useFormal(
    {
      username: '',
      password: '',
      email: '',
      displayName: '',
    },
    {
      schema,
      onSubmit: async values => {
        const { username, password, email, displayName } = values;
        setRegisterError(null);

        return registerUser({
          variables: {
            input: { username, password, email, name: displayName },
          },
        })
          .then(res => {
            if (res.data && res.data.registerUser) {
              // Register successful, login the user
              return loginRequest({ username, password }).then(res =>
                login({ redirectUrl: '/' })
              );
            }
            setRegisterError('Oops, something unexpected happened, try again');
          })
          .catch(err => {
            if (err.graphQLErrors) {
              const formErrors = {};

              err.graphQLErrors.forEach(graphQlError => {
                if (graphQlError.extensions.code === 'ALREADY_IN_USE') {
                  const { field } = graphQlError.extensions.exception;
                  if (field === 'username') {
                    formErrors.username = 'This username is already in use';
                  }
                  if (field === 'email') {
                    formErrors.email = 'This email is already in use';
                  }
                }
              });

              if (Object.entries(formErrors).length > 0) {
                formal.setErrors(formErrors);
              } else {
                setRegisterError(
                  'Oops, something unexpected happened, try again'
                );
              }
            } else {
              setRegisterError(
                'Oops, something unexpected happened, try again'
              );
            }
          });
      },
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

        {registerError && <div className="register-error">{registerError}</div>}

        <Button
          primary
          full
          className={className}
          {...formal.getSubmitButtonProps()}
        >
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

        .signup-form form {
          display: inline;
        }

        h1 {
          margin-bottom: 16px;
          color: rgba(0, 0, 0, 0.85);
          font-size: 1.9em;
          font-weight: bold;
          line-height: 1.1em;
        }

        .register-error {
          margin: 4px 0;
          color: #ff3860;
        }
      `}</style>
    </div>
  );
};

export default SignUpForm;
