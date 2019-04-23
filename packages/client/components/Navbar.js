import React from 'react';
import Link from 'next/link';
import cx from 'classnames';
import colors from '../lib/colors';
import Icon from './Icon';

const NavButton = ({ text, icon, iconSelected, selected, ...props }) => (
  <a className={cx('nav-button', { selected })} {...props}>
    <div className="btn-content">
      <div className="icon">
        <Icon
          name={selected && iconSelected ? iconSelected : icon}
          size="1.4em"
        />
      </div>
      {text}
    </div>
    <div className="border" />

    <style jsx>{`
      .nav-button {
        height: 100%;
        display: flex;
        flex-direction: column;
        position: relative;
        color: #4a4a4a;
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
  </a>
);

const Navbar = ({ currentPage }) => (
  <div className="app-navbar">
    <div className="container">
      <div className="bird">
        <Icon name="bird" color={colors.twitterBlue} size="1.28em" />
      </div>
      <div className="left">
        <Link href="/">
          <NavButton
            text="Home"
            icon="home"
            iconSelected="homeFilled"
            selected={currentPage === 'home'}
          />
        </Link>
        <a href="https://github.com/rafaelalmeidatk">
          <NavButton text="Project on Github" icon="promoteMode" />
        </a>
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
      .bird i {
        color: ${colors.twitterBlue};
        font-size: 1.28em;
      }

      .left {
        height: 100%;
        display: flex;
      }
    `}</style>
  </div>
);

export default Navbar;
