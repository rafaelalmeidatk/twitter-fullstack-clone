import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { gql } from 'apollo-boost';
import Icon from '../Icon';
import Tweet from '../Tweet';

import MainTweet from './MainTweet';
import Reply from './Reply';
import Replies from './Replies';

const GET_TWEET_QUERY = gql`
  query GetTweet($tweetId: ID!) {
    tweet(id: $tweetId) {
      ...TweetFields
      user {
        id
        name
        username
      }
      replies {
        ...TweetFields
      }
    }
  }
  ${Tweet.fragments.tweet}
`;

const Content = ({ tweetId, onClose }) => {
  const { data, loading } = useQuery(GET_TWEET_QUERY, {
    variables: { tweetId },
  });

  if (loading) {
    return 'Loading...';
  }

  const { tweet } = data;

  return (
    <div className="content">
      <MainTweet tweet={tweet} />
      <Reply tweetId={tweet.id} />

      <button className="btn-close" onClick={onClose}>
        <Icon name="close" color="#ffffff" size="27px" />
      </button>

      <Replies replies={tweet.replies} tweetAuthor={tweet.user} />

      <style jsx>{`
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

export default Content;
