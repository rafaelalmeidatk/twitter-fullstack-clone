import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import InfiniteScroll from 'react-infinite-scroller';
import Tweet from './Tweet';
import GET_USER_FEED_QUERY, { DEFAULT_VARIABLES } from '../queries/getUserFeed';

const LoadingMessage = ({ initial }) => (
  <div className="feed-loader">
    {initial ? 'Loading tweets...' : 'Loading more tweets...'}

    <style jsx>{`
      .feed-loader {
        background: #fff;
        padding: 20px;
        text-align: center;
      }
    `}</style>
  </div>
);

const Feed = () => {
  const { data, loading, fetchMore, refetch, errors } = useQuery(
    GET_USER_FEED_QUERY,
    {
      variables: DEFAULT_VARIABLES,
    }
  );

  if (loading) {
    return <LoadingMessage key="initial-feed-loader" initial />;
  }

  const loadMoreEntries = () => {
    const lastCursor = data.feed.edges[data.feed.edges.length - 1].cursor;
    return fetchMore({
      variables: {
        after: lastCursor,
      },
      updateQuery: (previousResult, data) => {
        const { fetchMoreResult } = data;

        if (!fetchMoreResult) {
          return previousResult;
        }

        return {
          ...previousResult,
          feed: {
            ...previousResult.feed,
            edges: [
              ...previousResult.feed.edges,
              ...fetchMoreResult.feed.edges,
            ],
            pageInfo: fetchMoreResult.feed.pageInfo,
          },
        };
      },
    });
  };

  const loader = <LoadingMessage key="feed-loader" />;

  return (
    <div className="feed">
      <InfiniteScroll
        hasMore={data.feed.pageInfo.hasNextPage}
        loader={loader}
        loadMore={loadMoreEntries}
      >
        {data.feed.edges.map(edge => {
          const { node } = edge;
          let tweet, id, context;

          if (node.tweet) {
            id = node.tweet.id;
            tweet = node.tweet;
          }
          if (node.retweet) {
            id = node.retweet.id;
            tweet = node.retweet.tweet;
            context = { user: node.retweet.user, action: 'RETWEET' };
          }
          if (node.like) {
            id = node.like.id;
            tweet = node.like.tweet;
            context = { user: node.like.user, action: 'LIKE' };
          }

          return (
            <Tweet
              key={id}
              id={tweet.id}
              content={tweet.content}
              name={tweet.user.name}
              username={tweet.user.username}
              retweeted={tweet.retweeted}
              liked={tweet.liked}
              refetch={refetch}
              context={context}
            />
          );
        })}
      </InfiniteScroll>
    </div>
  );
};

export default Feed;
