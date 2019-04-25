import React from 'react';
import Tweet from './Tweet';

const ProfileTweets = ({ user }) => {
  return user.tweets.map(tweet => (
    <Tweet
      id={tweet.id}
      key={tweet.id}
      content={tweet.content}
      name={user.name}
      username={user.username}
      retweeted={tweet.retweeted}
      liked={tweet.liked}
    />
  ));
};

export default ProfileTweets;
