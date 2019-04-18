import React from 'react';
import cx from 'classnames';

const Icon = ({ name, color, size }) => (
  <i className={cx('Icon', `Icon--${name}`)}>
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
