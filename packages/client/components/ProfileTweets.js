import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import Tweet from './Tweet';

const GET_USER_TWEETS_QUERY = gql`
  query getUserTweets {
    me {
      id
      tweets {
        id
        content
        user {
          id
          name
          username
        }
      }
    }
  }
`;

const ProfileTweets = () => {
  const { data, loading, errors } = useQuery(GET_USER_TWEETS_QUERY);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="feed">
      {data.me.tweets.map(tweet => (
        <Tweet
          key={tweet.id}
          id={tweet.id}
          content={tweet.content}
          name={tweet.user.name}
          username={tweet.user.username}
        />
      ))}
    </div>
  );
};

export default ProfileTweets;
