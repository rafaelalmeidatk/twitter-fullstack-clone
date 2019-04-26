import React, { useState, useMemo } from 'react';
import cx from 'classnames';
import colors from '../lib/colors';
import Icon from './Icon';
import OutsideClickHandler from './OutsideClickHandler';

const Caret = () => (
  <div className="caret">
    <div className="arrow shadow" />
    <div className="arrow solid" />
    <style jsx>{`
      .caret {
        position: absolute;
        top: -10px;
        right: 10px;
        width: 18px;
        overflow: visible;
      }

      .caret .arrow {
        position: absolute;
        display: inline-block;
        top: -10px;
        left: 0px;
        height: auto;
        width: auto;
      }

      .caret .arrow.shadow {
        border-top: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid rgba(0, 0, 0, 0.1);
        border-left: 10px solid transparent;
      }

      .caret .arrow.solid {
        top: -8px;
        left: 1px;
        border-top: 9px solid transparent;
        border-right: 9px solid transparent;
        border-bottom: 9px solid #fff;
        border-left: 9px solid transparent;
      }
    `}</style>
  </div>
);

export const Option = ({
  divider,
  icon,
  text,
  children,
  href,
  linkComponent,
}) => {
  const LinkComponent = linkComponent || 'a';
  return (
    <li className={cx({ divider })}>
      {children}
      {!divider && !children && (
        <LinkComponent href={href}>
          {icon && <Icon name={icon} size="18px" />}
          {text && text}
        </LinkComponent>
      )}

      <style jsx>{`
        li > a {
          padding: 8px 16px;
          display: flex;
          align-items: center;
          font-size: 0.9em;
          color: #14171a;
        }

        li > a:hover {
          background-color: ${colors.twitterBlueStrong};
          color: #fff;
        }

        li > a:hover :global(i) {
          color: #fff;
        }

        li :global(i) {
          color: ${colors.blueGray};
          margin-top: -1px;
          margin-right: 12px;
        }

        li.divider {
          margin: 6px 1px;
          width: 100%;
          height: 1px;
          background-color: ${colors.boxBorder};
        }
      `}</style>
    </li>
  );
};

const Dropdown = ({ children, triggerButton }) => {
  const [open, setOpen] = useState(false);

  const handleButtonClick = () => {
    setOpen(prev => !prev);
  };

  const TriggerButton = useMemo(
    () => React.cloneElement(triggerButton, { onClick: handleButtonClick }),
    [triggerButton]
  );

  return (
    <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
      {TriggerButton}

      <div className={cx('dropdown', { open })}>
        <Caret />
        <ul>{children}</ul>
        <style jsx>{`
          .dropdown {
            position: absolute;
            top: 100%;
            right: 0;
            display: none;
            margin-top: 10px;
            padding: 10px 0;
            width: 200px;
            background: #fff;
            border-radius: 4px;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
          }

          .dropdown.open {
            display: block;
          }

          ul {
            width: 100%;
          }
        `}</style>
      </div>
    </OutsideClickHandler>
  );
};

export default Dropdown;
