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

          font-size: 0.9em;
          font-weight: bold;
          padding: 12px;
        }

        .btn.primary {
          color: #fff;
          background: #1da1f2;
          border: 1px solid #fff;
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
