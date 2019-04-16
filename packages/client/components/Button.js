import React from 'react';
import cx from 'classnames';

const Button = ({
  primary,
  full,
  narrow,
  simple,
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={cx('btn', className, { primary, full, narrow, simple })}
      {...props}
    >
      {children}
      <style jsx>{`
        .btn {
          color: #1da1f2;
          background: #fff;
          border: 1px solid #1da1f2;
          border-radius: 50px;
          cursor: pointer;
          outline: none;

          font-size: 0.9em;
          font-weight: bold;
          padding: 12px;

          transition: background 0.2s ease;
        }

        .btn:hover {
          background: #e9f5fd;
        }

        .btn:active {
          background: #dcf1ff;
        }

        .btn:focus:not(:active) {
          box-shadow: 0 0 0 0.18em rgb(154, 210, 249);
        }

        .btn.primary {
          color: #fff;
          background: #1da1f2;
          border: none;
        }

        .btn.primary:hover {
          background: #1899e8;
        }

        .btn.primary:active {
          background: #148dd8;
        }

        .btn.full {
          width: 100%;
        }

        .btn.narrow {
          padding-top: 8px;
          padding-bottom: 8px;
        }

        .btn.simple {
          border: none;
          background: none;
        }
      `}</style>
    </button>
  );
};

export default Button;
