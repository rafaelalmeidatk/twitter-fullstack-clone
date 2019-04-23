import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import InfiniteScroll from 'react-infinite-scroller';
import Tweet from './Tweet';

const GET_USER_FEED_QUERY = gql`
  query getUserFeed($first: Int!, $after: String) {
    feed(first: $first, after: $after) {
      edges {
        node {
          id
          content
          user {
            id
            name
            username
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;

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
  const { data, loading, fetchMore, errors } = useQuery(GET_USER_FEED_QUERY, {
    variables: {
      first: 10,
      after: null,
    },
  });

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
        key="infinite-scroll-loader"
        hasMore={data.feed.pageInfo.hasNextPage}
        loader={loader}
        loadMore={loadMoreEntries}
      >
        {data.feed.edges.map(edge => {
          const tweet = edge.node;

          return (
            <Tweet
              key={tweet.id}
              content={tweet.content}
              name={tweet.user.name}
              username={tweet.user.username}
            />
          );
        })}
      </InfiniteScroll>
    </div>
  );
};

export default Feed;
