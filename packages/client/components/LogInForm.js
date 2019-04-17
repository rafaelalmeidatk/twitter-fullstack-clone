import React, { useState } from 'react';
import css from 'styled-jsx/css';
import useFormal from '@kevinwolf/formal-web';
import * as yup from 'yup';
import { HTTPError } from 'ky-universal';

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
});

const LogInForm = ({ onBack }) => {
  const [loginError, setLoginError] = useState(null);

  const formal = useFormal(
    {
      username: '',
      password: '',
    },
    {
      schema,
      onSubmit: async values => {
        const { username, password } = values;
        setLoginError(null);

        return loginRequest({ username, password })
          .then(res => login({ redirectUrl: '/test' }))
          .catch(err => {
            if (err instanceof HTTPError) {
              if (err.response.status === 400) {
                return setLoginError(
                  'Username or password is incorrect, try again'
                );
              }
              if (err.response.status === 401) {
                return formal.setErrors({
                  password: 'The password is incorrect, try again',
                });
              }
            }

            setLoginError('Oops, something unexpected happened, try again');
          });
      },
    }
  );

  return (
    <div className="login-form">
      <h1>Log In</h1>

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
        {loginError && <div className="login-error">{loginError}</div>}

        <Button
          primary
          full
          className={className}
          {...formal.getSubmitButtonProps()}
        >
          Log In
        </Button>
      </form>

      <Button simple full onClick={onBack}>
        Go Back
      </Button>

      {styles}
      <style jsx>{`
        .login-form {
          max-width: 350px;
        }

        .login-form form {
          display: inline;
        }

        h1 {
          margin-bottom: 16px;
          color: rgba(0, 0, 0, 0.85);
          font-size: 1.9em;
          font-weight: bold;
          line-height: 1.1em;
        }

        .login-error {
          margin: 4px 0;
          color: #ff3860;
        }
      `}</style>
    </div>
  );
};

export default LogInForm;
