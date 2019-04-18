import React from 'react';
import cx from 'classnames';

const NavButton = ({ text, selected }) => (
  <div className={cx('nav-button', { selected })}>
    <div className="btn-content">
      <div className="icon" />
      {text}
    </div>
    <div className="border" />

    <style jsx>{`
      .nav-button {
        height: 100%;
        display: flex;
        flex-direction: column;
        position: relative;
        transition: color 0.2s ease;
      }

      .border {
        position: absolute;
        bottom: 0;
        height: 0px;
        width: 100%;
        background-color: #1da1f2;
        transition: height 0.2s ease;
      }

      .nav-button.selected,
      .nav-button:hover {
        color: #1da1f2;
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
        background: tomato;
      }
    `}</style>
  </div>
);

const Navbar = () => (
  <div className="app-navbar">
    <div className="container">
      <div className="bird">
        <i className="Icon Icon--bird" />
      </div>
      <div className="left">
        <NavButton text="Home" selected={true} />
        <NavButton text="Github" />
      </div>
      <div className="right">right</div>
    </div>

    <style jsx>{`
      .app-navbar {
        width: 100%;
        height: 46px;
        background: #fff;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.45);
      }

      .container {
        position: relative;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .bird {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
      }

      .left {
        height: 100%;
        display: flex;
      }
    `}</style>
  </div>
);

export default Navbar;
