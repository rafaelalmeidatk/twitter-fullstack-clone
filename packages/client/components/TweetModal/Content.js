import React, { useContext } from 'react';
import { useQuery } from 'react-apollo-hooks';
import { gql } from 'apollo-boost';
import colors from '../../lib/colors';
import Tweet from 'components/Tweet';
import TweetsListFooter from 'components/TweetsListFooter';
import Loading from 'components/Loading';
import { LoggedInContext } from 'components/LoggedInUserProvider';

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

const Content = ({ tweetId, onTweetClick }) => {
  const loggedInUser = useContext(LoggedInContext);

  const { data, loading } = useQuery(GET_TWEET_QUERY, {
    variables: { tweetId },
  });

  if (loading) {
    return (
      <div className="loading">
        <Loading color={colors.loadingGray} />
        <style jsx>{`
          .loading {
            padding: 60px 10px;
            text-align: center;
          }
        `}</style>
      </div>
    );
  }

  const { tweet } = data;

  return (
    <>
      <MainTweet tweet={tweet} />
      {loggedInUser && <Reply tweetId={tweet.id} />}
      <Replies
        replies={tweet.replies}
        tweetAuthor={tweet.user}
        onTweetClick={onTweetClick}
      />
      {tweet.replies && tweet.replies.length > 0 && <TweetsListFooter />}
    </>
  );
};

export default Content;
