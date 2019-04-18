import React from 'react';
import Tweet from './Tweet';

const Feed = () => {
  const tweets = [
    {
      id: 321,
      content:
        'Nulla vehicula nunc ut nibh elementum, nec accumsan tortor sodales.',
      author: {
        id: 321321,
        name: 'Rafael Almeida',
        username: 'rafaelalmeidatk',
      },
      createdAt: 1555569044659,
    },
    {
      id: 444,
      content:
        'Nulla vehicula nunc ut nibh elementum, nec accumsan tortor sodales.',
      author: {
        id: 321321,
        name: 'Rafael Almeida',
        username: 'rafaelalmeidatk',
      },
      createdAt: 1555569044659,
    },
  ];

  return (
    <div className="feed">
      {tweets.map(tweet => (
        <Tweet
          key={tweet.id}
          content={tweet.content}
          name={tweet.author.name}
          username={tweet.author.username}
        />
      ))}
    </div>
  );
};

export default Feed;
