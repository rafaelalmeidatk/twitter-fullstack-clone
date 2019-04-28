import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { gql } from 'apollo-boost';
import ReactModal from 'react-modal';
import colors from '../lib/colors';
import NewTweet from './NewTweet';
import FollowButton from './FollowButton';
import Avatar from './Avatar';
import Icon from './Icon';
import Tweet, { TweetFooter } from './Tweet';

const GET_TWEET_QUERY = gql`
  query GetTweet($tweetId: ID!) {
    tweet(id: $tweetId) {
      id
      content
      retweetCount
      likeCount
      retweeted
      liked
      user {
        id
        name
        username
      }
    }
  }
`;

const TweetModalContent = ({ tweetId, onClose }) => {
  const { data, loading } = useQuery(GET_TWEET_QUERY, {
    variables: { tweetId },
  });

  if (loading) {
    return 'Loading...';
  }

  const { tweet } = data;

  return (
    <div className="content">
      <div className="header">
        <Avatar size="medium" />
        <div className="user-data">
          <div className="name">{tweet.user.name}</div>
          <div className="username">@{tweet.user.username}</div>
        </div>
        <FollowButton targetUser={tweet.user} />
      </div>

      <div className="body">{tweet.content}</div>

      {tweet.retweetCount || tweet.likeCount ? (
        <div className="stats">
          {tweet.retweetCount ? (
            <div className="stat">
              <strong>{tweet.retweetCount}</strong> Retweets
            </div>
          ) : null}

          {tweet.likeCount ? (
            <div className="stat">
              <strong>{tweet.likeCount}</strong> Likes
            </div>
          ) : null}
        </div>
      ) : null}

      <TweetFooter
        retweetCount={tweet.retweetCount}
        likeCount={tweet.likeCount}
      />

      <button className="btn-close" onClick={onClose}>
        <Icon name="close" color="#ffffff" size="27px" />
      </button>

      <style jsx>{`
        .content {
          padding: 30px 40px;
        }

        .header {
          margin-bottom: 15px;
          display: flex;
          align-items: center;
        }

        .user-data {
          margin-left: 10px;
          flex: 1 1 auto;
        }

        .name {
          margin-top: -2px;
          margin-bottom: 6px;
          color: rgba(0, 0, 0, 0.85);
          font-size: 1.2em;
          line-height: 1em;
          font-weight: bold;
        }

        .username {
          line-height: 1em;
          font-size: 0.9em;
          color: rgba(0, 0, 0, 0.7);
        }

        .body {
          cursor: default;
          font-size: 1.6em;
          line-height: 1.3em;
          letter-spacing: 0.01em;
          color: rgba(0, 0, 0, 0.85);
        }

        .stats {
          margin-top: 10px;
          padding: 12px 0;
          display: flex;
          border-top: 1px solid ${colors.boxBorder};
          border-bottom: 1px solid ${colors.boxBorder};
        }

        .stat {
          margin-right: 10px;
          color: ${colors.blueGray};
          font-size: 0.87em;
        }

        .content :global(.tweet-footer) {
          margin-top: 10px;
        }

        .btn-close {
          position: absolute;
          top: -50px;
          left: calc(100% + (100vw - 610px) / 2);
          transform: translateX(-200%);

          width: 27px;
          height: 27px;
          cursor: pointer;
          background: 0;
          padding: 0;
          border: 0;
        }
      `}</style>
    </div>
  );
};

const TweetModal = ({ isOpen, onClose, tweetId }) => (
  <ReactModal
    isOpen={isOpen}
    onRequestClose={onClose}
    overlayClassName="tweet-modal-overlay"
    className="tweet-modal-content"
  >
    <TweetModalContent tweetId={tweetId} onClose={onClose} />
    <style jsx global>{`
      .tweet-modal-overlay {
        position: fixed;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        background-color: rgba(0, 0, 0, 0.75);
        z-index: 9999;
      }

      .tweet-modal-content {
        position: relative;
        top: 60px;
        left: 50%;
        transform: translateX(-50%);
        width: 610px;

        background: #fff;
        border-radius: 6px;
        outline: none;
      }
    `}</style>
  </ReactModal>
);

export default TweetModal;
