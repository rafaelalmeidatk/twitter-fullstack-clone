import React from 'react';
import colors from '../../lib/colors';
import Tweet from 'components/Tweet';

const Replies = ({ tweetAuthor, replies }) => {
  return (
    <div className="replies-area">
      {replies.map(tweet => (
        <div key={tweet.id} className="tweet-wrapper">
          <Tweet tweet={tweet} noBorders replyingTo={tweetAuthor.username} />
        </div>
      ))}

      <style jsx>{`
        .tweet-wrapper {
          padding: 0 28px;
          border-left: 1px solid ${colors.boxBorder};
          border-right: 1px solid ${colors.boxBorder};
          border-bottom: 1px solid ${colors.boxBorder};
        }
      `}</style>
    </div>
  );
};

export default Replies;
