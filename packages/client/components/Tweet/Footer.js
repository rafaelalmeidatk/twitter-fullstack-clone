import React from 'react';
import cx from 'classnames';
import { useMutation } from 'react-apollo-hooks';
import { gql } from 'apollo-boost';
import colors from '../../lib/colors';
import Icon from 'components/Icon';

const RETWEET_QUERY = gql`
  mutation RetweetQuery($input: RetweetInput!) {
    retweet(input: $input) {
      context {
        originalTweet {
          id
          content
          retweetCount
          retweeted
        }
        contextTweet {
          id
        }
      }
    }
  }
`;

const LIKE_QUERY = gql`
  mutation LikeQuery($input: LikeInput!) {
    like(input: $input) {
      context {
        originalTweet {
          id
          content
          likeCount
          liked
        }
        contextTweet {
          id
        }
      }
    }
  }
`;

const Footer = ({
  tweetId,
  replyCount,
  retweetCount,
  likeCount,
  retweeted,
  liked,
  onReply,
  refetch,
}) => {
  const variables = { input: { tweetId } };
  const retweet = useMutation(RETWEET_QUERY, { variables });
  const like = useMutation(LIKE_QUERY, { variables });

  const handleRetweet = async e => {
    e.stopPropagation();
    await retweet();
    refetch && refetch();
    // TODO: add message of success
  };

  const handleLike = async e => {
    e.stopPropagation();
    await like();
    refetch && refetch();
    // TODO: add message of success
  };

  return (
    <div className="tweet-footer">
      <div className={cx('reply')} onClick={onReply}>
        <Icon name="reply" />
        <span>{replyCount || ''}</span>
      </div>
      <div
        className={cx('retweet', { active: retweeted })}
        onClick={handleRetweet}
      >
        <Icon name="retweet" />
        <span>{retweetCount || ''}</span>
      </div>
      <div className={cx('like', { active: liked })} onClick={handleLike}>
        <Icon name={liked ? 'heartBadge' : 'heart'} />
        <span>{likeCount || ''}</span>
      </div>

      <style jsx>{`
        .tweet-footer {
          min-height: 19px;
          display: flex;
          color: rgba(55, 55, 55, 0.8);
        }

        .tweet-footer :global(i) {
          margin-top: -4px;
        }

        .tweet-footer > div {
          padding-right: 4px;
          display: flex;
          align-items: center;
          min-width: 80px;
          cursor: pointer;
        }

        .tweet-footer span {
          margin-left: 8px;
          font-size: 0.8em;
          font-weight: bold;
        }

        .tweet-footer :global(i) {
          font-size: 1.1em;
          color: rgba(55, 55, 55, 0.8);
        }

        .tweet-footer span,
        .tweet-footer :global(i) {
          transition: color 0.2s ease;
        }

        .tweet-footer > div.reply:hover,
        .tweet-footer > div.reply:hover :global(i) {
          color: ${colors.twitterBlue};
        }

        .tweet-footer > div.retweet.active,
        .tweet-footer > div.retweet:hover,
        .tweet-footer > div.retweet.active :global(i),
        .tweet-footer > div.retweet:hover :global(i) {
          color: ${colors.retweet};
        }

        .tweet-footer > div.like.active,
        .tweet-footer > div.like:hover,
        .tweet-footer > div.like.active :global(i),
        .tweet-footer > div.like:hover :global(i) {
          color: ${colors.like};
        }
      `}</style>
    </div>
  );
};

export default Footer;
