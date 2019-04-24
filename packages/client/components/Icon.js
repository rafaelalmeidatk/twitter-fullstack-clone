import React from 'react';
import cx from 'classnames';

const Icon = ({ name, color, size, ...props }) => (
  <i className={cx('Icon', `Icon--${name}`)} {...props}>
    <style jsx>{`
      i {
        font-size: ${size};
        color: ${color};
      }
    `}</style>
  </i>
);

Icon.defaultProps = {
  color: 'initial',
  size: '1em',
};

export default Icon;
