import React from 'react';
import cx from 'classnames';
import colors from '../lib/colors';
import Icon from 'components/Icon';
import Loading from 'components/Loading';

const TweetsListFooter = ({ loading, whiteVariant, loadingNoSsr }) => (
  <div className={cx('tweets-list-footer', { 'white-variant': whiteVariant })}>
    {loading ? (
      <Loading color={colors.loadingGray} noSsr={loadingNoSsr} />
    ) : (
      <Icon
        name="bird"
        color={whiteVariant ? '#14171a' : '#ccd6dd'}
        size="21px"
      />
    )}

    <style jsx>{`
      .tweets-list-footer {
        padding: 16px 20px 18px;
        background: transparent;
        text-align: center;
        background: ${colors.gray};
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
