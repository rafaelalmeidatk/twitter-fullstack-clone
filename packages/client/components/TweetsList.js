import React from 'react';
import Tweet from './Tweet';

const TweetsList = ({ tweets, author }) => (
  <div>
    {tweets.map(tweet => (
      <Tweet
        id={tweet.id}
        key={tweet.id}
        content={tweet.content}
        name={author ? author.name : tweet.user.name}
        username={author ? author.username : tweet.user.username}
      />
    ))}
  </div>
);

export default TweetsList;
