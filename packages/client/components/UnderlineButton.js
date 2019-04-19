import React from 'react';
import cx from 'classnames';
import colors from '../lib/colors';

const UnderlineButton = ({ children, selected }) => (
  <div className={cx('nav-button', { selected })}>
    <div className="btn-content">{children}</div>
    <div className="border" />

    <style jsx>{`
      .nav-button {
        height: 100%;
        display: flex;
        flex-direction: column;
        position: relative;
      }

      .nav-button,
      .nav-button .icon :global(i) {
        transition: color 0.2s ease;
      }

      .border {
        position: absolute;
        bottom: 0;
        height: 0px;
        width: 100%;
        background-color: ${colors.twitterBlue};
        transition: height 0.2s ease;
      }

      .nav-button.selected,
      .nav-button:hover,
      .nav-button.selected .icon :global(i),
      .nav-button:hover .icon :global(i) {
        color: ${colors.twitterBlue};
      }

      .nav-button.selected .border,
      .nav-button:hover .border {
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
  </div>
);

export default UnderlineButton;
