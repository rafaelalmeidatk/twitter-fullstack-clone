import React from 'react';
import InfiniteTweetsList from 'components/InfiniteTweetsList';
import GET_USER_FEED_QUERY, { DEFAULT_VARIABLES } from '../queries/getUserFeed';

const hasMore = data => data.feed.pageInfo.hasNextPage;
const extractEdges = data => data.feed.edges;

const Feed = ({ onTweetClick }) => {
  const loadMoreEntries = (data, fetchMore) => {
    const lastCursor = data.feed.edges[data.feed.edges.length - 1].cursor;
    return fetchMore({
      variables: { after: lastCursor },
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

  return (
    <InfiniteTweetsList
      fetchQuery={GET_USER_FEED_QUERY}
      variables={DEFAULT_VARIABLES}
      loadMoreEntries={loadMoreEntries}
      extractEdges={extractEdges}
      hasMore={hasMore}
      onTweetClick={onTweetClick}
    />
  );
};

export default Feed;
