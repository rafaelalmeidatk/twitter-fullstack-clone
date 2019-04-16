import React, { useState } from 'react';
import css from 'styled-jsx/css';
import Button from './Button';

const { className, styles } = css.resolve`
  button {
    margin-top: 8px;
  }
`;

const SignUpForm = ({ onBack }) => {
  return (
    <div className="signup-form">
      <h1>Sign Up</h1>

      <input className="input" type="text" placeholder="Username" />
      <input className="input" type="password" placeholder="Password" />
      <input className="input" type="text" placeholder="Email" />
      <input className="input" type="text" placeholder="Display Name" />

      <Button primary full className={className}>
        Sign Up
      </Button>

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

        .input {
          margin: 6px 0;
        }
      `}</style>
    </div>
  );
};

export default SignUpForm;
