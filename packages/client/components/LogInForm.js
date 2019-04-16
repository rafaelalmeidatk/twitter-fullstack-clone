import React, { useState } from 'react';
import css from 'styled-jsx/css';
import Button from './Button';

const { className, styles } = css.resolve`
  button {
    margin-top: 8px;
  }
`;

const LogInForm = ({ onBack }) => {
  return (
    <div className="login-form">
      <h1>Log In</h1>

      <input className="input" type="text" placeholder="Username" />
      <input className="input" type="password" placeholder="Password" />

      <Button primary full className={className}>
        Log In
      </Button>

      <Button simple full onClick={onBack}>
        Go Back
      </Button>

      {styles}
      <style jsx>{`
        .login-form {
          max-width: 350px;
        }

        h1 {
          margin-bottom: 16px;
          color: rgba(0, 0, 0, 0.85);
          font-size: 1.9em;
          font-weight: bold;
          line-height: 1.1em;
        }

        .input {
          margin: 6px 0;
        }
      `}</style>
    </div>
  );
};

export default LogInForm;
