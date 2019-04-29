import React from 'react';
import colors from '../../lib/colors';
import Tweet from 'components/Tweet';

const Replies = ({ replies, tweetAuthor, onTweetClick }) => {
  return (
    <div className="replies-area">
      {replies.map(tweet => (
        <div key={tweet.id} className="tweet-wrapper">
          <Tweet
            tweet={tweet}
            replyingTo={tweetAuthor.username}
            onClick={onTweetClick}
            noBorders
          />
        </div>
      ))}

      <style jsx>{`
        .tweet-wrapper {
          border-left: 1px solid ${colors.boxBorder};
          border-right: 1px solid ${colors.boxBorder};
          border-bottom: 1px solid ${colors.boxBorder};
        }

        .tweet-wrapper :global(.tweet) {
          padding-left: 40px;
          padding-right: 40px;
        }
      `}</style>
    </div>
  );
};

export default Replies;
