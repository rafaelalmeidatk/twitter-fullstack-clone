export const decodeCursor = cursor => {
  const content = new Buffer(cursor, 'base64').toString('binary');
  const [after, order] = content.split(';');
  return { after: new Date(after), order };
};

export const encodeCursor = ({ after, order }) => {
  const input = [new Date(after).toISOString(), order].join(';');
  return Buffer.from(input).toString('base64');
};

export const buildEdgesForTweetsPagination = (tweets, order) =>
  tweets.map(tweet => {
    const type = tweet.retweetForTweetId
      ? 'RETWEET'
      : tweet.likeForTweetId
      ? 'LIKE'
      : 'TWEET';

    const node = { ...tweet, type };

    return {
      cursor: encodeCursor({
        after: tweet.created_at,
        order,
      }),
      node,
    };
  });
