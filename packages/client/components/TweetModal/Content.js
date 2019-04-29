import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { gql } from 'apollo-boost';
import Icon from 'components/Icon';
import Tweet from 'components/Tweet';

import MainTweet from './MainTweet';
import Reply from './Reply';
import Replies from './Replies';
import TweetsListFooter from 'components/TweetsListFooter';

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

const Content = ({ tweetId }) => {
  const { data, loading } = useQuery(GET_TWEET_QUERY, {
    variables: { tweetId },
  });

  if (loading) {
    return 'Loading...';
  }

  const { tweet } = data;

  return (
    <>
      <MainTweet tweet={tweet} />
      <Reply tweetId={tweet.id} />
      <Replies replies={tweet.replies} tweetAuthor={tweet.user} />

      {tweet.replies && tweet.replies.length > 0 && <TweetsListFooter />}
    </>
  );
};

export default Content;
