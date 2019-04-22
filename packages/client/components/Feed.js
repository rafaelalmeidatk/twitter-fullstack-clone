import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import Tweet from './Tweet';

const GET_USER_FEED_QUERY = gql`
  query getUserFeed {
    feed {
      id
      content
      user {
        id
        name
        username
      }
    }
  }
`;

const Feed = () => {
  const { data, loading, errors } = useQuery(GET_USER_FEED_QUERY);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="feed">
      {data.feed.map(tweet => (
        <Tweet
          key={tweet.id}
          content={tweet.content}
          name={tweet.user.name}
          username={tweet.user.username}
        />
      ))}
    </div>
  );
};

export default Feed;
