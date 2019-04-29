import React from 'react';
import cx from 'classnames';
import colors from '../lib/colors';
import Icon from 'components/Icon';

const TweetsListFooter = ({ whiteVariant }) => (
  <div className={cx('tweets-list-footer', { 'white-variant': whiteVariant })}>
    <Icon
      name="bird"
      color={whiteVariant ? '#14171a' : '#ccd6dd'}
      size="21px"
    />

    <style jsx>{`
      .tweets-list-footer {
        padding: 15px 20px;
        background: transparent;
        text-align: center;
      }

      .tweets-list-footer.white-variant {
        background: #fff;
        border: 1px solid ${colors.boxBorder};
        border-top: none;
      }
    `}</style>
  </div>
);

export default TweetsListFooter;
