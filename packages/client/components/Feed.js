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
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.feed.edges;
        const pageInfo = fetchMoreResult.feed.pageInfo;

        return {
          feed: {
            __typename: previousResult.feed.__typename,
            edges: [...previousResult.feed.edges, ...newEdges],
            pageInfo,
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
          const { originalTweet, contextTweet, contextUser } = node;

          const id = contextTweet ? contextTweet.id : originalTweet.id;
          const context = contextUser
            ? { user: contextUser, action: node.type }
            : null;

          return (
            <Tweet
              key={id}
              id={originalTweet.id}
              content={originalTweet.content}
              name={originalTweet.user.name}
              username={originalTweet.user.username}
              retweeted={originalTweet.retweeted}
              liked={originalTweet.liked}
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
