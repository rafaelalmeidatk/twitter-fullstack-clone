import React from 'react';
import InfiniteTweetsList from 'components/InfiniteTweetsList';
import GET_USER_PROFILE_TWEETS_QUERY, {
  DEFAULT_VARIABLES,
} from '../queries/getUserProfileTweets';

const hasMore = data => data.user.profileTweets.pageInfo.hasNextPage;
const extractEdges = data => data.user.profileTweets.edges;

const ProfileTweets = ({ user, onTweetClick }) => {
  const loadMoreEntries = (data, fetchMore) => {
    const lastCursor =
      data.user.profileTweets.edges[data.user.profileTweets.edges.length - 1]
        .cursor;

    return fetchMore({
      variables: { after: lastCursor },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.user.profileTweets.edges;
        const pageInfo = fetchMoreResult.user.profileTweets.pageInfo;

        return {
          user: {
            ...fetchMoreResult.user,
            profileTweets: {
              __typename: previousResult.user.profileTweets.__typename,
              edges: [...previousResult.user.profileTweets.edges, ...newEdges],
              pageInfo,
            },
          },
        };
      },
    });
  };

  return (
    <InfiniteTweetsList
      fetchQuery={GET_USER_PROFILE_TWEETS_QUERY}
      variables={{ ...DEFAULT_VARIABLES, username: user.username }}
      loadMoreEntries={loadMoreEntries}
      extractEdges={extractEdges}
      hasMore={hasMore}
      onTweetClick={onTweetClick}
    />
  );
};

export default ProfileTweets;
