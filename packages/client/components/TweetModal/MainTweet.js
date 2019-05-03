import React, { useContext } from 'react';
import colors from '../../lib/colors';
import { getTweetTime } from '../../lib/time';
import FollowButton from 'components/FollowButton';
import Avatar from 'components/Avatar';
import { TweetFooter } from 'components/Tweet';
import { LoggedInContext } from 'components/LoggedInUserProvider';

const MainTweet = ({ tweet }) => {
  const loggedInUser = useContext(LoggedInContext);
  const renderFollowButton = loggedInUser && tweet.user.id !== loggedInUser.id;
  const time = getTweetTime(tweet.createdAt);

  return (
    <div className="tweet-area">
      <div className="header">
        <Avatar src={tweet.user.avatarSourceUrl} size="medium" />
        <div className="user-data">
          <div className="name">{tweet.user.name}</div>
          <div className="username">@{tweet.user.username}</div>
        </div>
        {renderFollowButton && <FollowButton targetUser={tweet.user} />}
      </div>

      <div className="body">{tweet.content}</div>
      <div className="time">{time}</div>

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
        tweetId={tweet.id}
        replyCount={tweet.replyCount}
        retweetCount={tweet.retweetCount}
        likeCount={tweet.likeCount}
        retweeted={tweet.retweeted}
        liked={tweet.liked}
      />

      <style jsx>{`
        .tweet-area {
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

        .time {
          cursor: default;
          margin-top: 10px;
          font-size: 0.88em;
          color: ${colors.blueGray};
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

        .tweet-area :global(.tweet-footer) {
          margin-top: 13px;
        }
      `}</style>
    </div>
  );
};

export default MainTweet;
