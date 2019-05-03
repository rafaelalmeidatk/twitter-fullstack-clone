import React, { useState } from 'react';
import { useMutation } from 'react-apollo-hooks';
import { gql } from 'apollo-boost';
import colors from '../../lib/colors';
import NewTweet from 'components/NewTweet';
import Tweet from 'components/Tweet';

const REPLY_MUTATION = gql`
  mutation ReplyTweet($input: ReplyTweetInput!) {
    replyTweet(input: $input) {
      repliedTweet {
        id
        replyCount
        replies {
          id
          content
          user {
            id
            username
          }
        }
      }
      replyTweet {
        ...TweetFields
      }
    }
  }
  ${Tweet.fragments.tweet}
`;

const Reply = ({ tweetId }) => {
  const reply = useMutation(REPLY_MUTATION);

  const handleReply = async content => {
    await reply({ variables: { input: { tweetId, content } } });
  };

  return (
    <div className="reply-area">
      <NewTweet
        transparent
        replyingTo="rafaelalmeidatk"
        submitButtonText="Reply"
        placeholder="Tweet your reply"
        onSubmit={handleReply}
      />

      <style jsx>{`
        .reply-area {
          padding: 5px 32px 5px 22px;
          background-color: ${colors.gray};
          border-top: 1px solid ${colors.boxBorder};
          border-bottom: 1px solid ${colors.boxBorder};
        }
      `}</style>
    </div>
  );
};

export default Reply;
