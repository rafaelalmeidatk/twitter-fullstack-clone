import React from 'react';
import cx from 'classnames';
import colors from '../lib/colors';

const UnderlineButton = ({ children, selected, className, as, ...props }) => {
  const Component = as || 'button';

  return (
    <Component
      className={cx('underline-btn', className, { selected })}
      {...props}
    >
      <div className="btn-content">{children}</div>
      <div className="border" />

      <style jsx>{`
        .underline-btn {
          padding: 0;
          margin: 0;
          border: 0;
          background: 0;
          font-size: unset;
          height: 100%;
          display: flex;
          flex-direction: column;
          position: relative;
          color: #4a4a4a;
        }

        .underline-btn,
        .underline-btn .icon :global(i) {
          transition: color 0.2s ease;
        }

        a.underline-btn:hover {
          color: ${colors.twitterBlue};
        }

        .border {
          position: absolute;
          bottom: 0;
          height: 0px;
          width: 100%;
          background-color: ${colors.twitterBlue};
          transition: height 0.2s ease;
        }

        .underline-btn.selected,
        .underline-btn:hover,
        .underline-btn.selected .icon :global(i),
        .underline-btn:hover .icon :global(i) {
          color: ${colors.twitterBlue};
        }

        .underline-btn.selected .border,
        .underline-btn:hover .border {
          height: 2px;
        }

        .btn-content {
          margin-top: -2px;
          flex: 1 1 auto;
          padding: 0 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85em;
          font-weight: bold;
        }

        .icon {
          width: 23px;
          height: 23px;
          margin-right: 6px;
        }
      `}</style>
    </Component>
  );
};

export default UnderlineButton;
