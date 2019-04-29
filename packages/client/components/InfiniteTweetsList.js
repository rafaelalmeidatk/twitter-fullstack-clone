import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import InfiniteScroll from 'react-infinite-scroller';
import colors from '../lib/colors';
import Tweet from 'components/Tweet';
import TweetsListFooter from 'components/TweetsListFooter';
import Loading from 'components/Loading';

const LoadingMessage = () => (
  <div className="feed-loader">
    <Loading color={colors.loadingGray} noSsr={true} />

    <style jsx>{`
      .feed-loader {
        background: #fff;
        padding: 20px;
        text-align: center;
      }
    `}</style>
  </div>
);

const InfiniteTweetsList = ({
  fetchQuery,
  variables,
  loadMoreEntries,
  hasMore,
  extractEdges,
  onTweetClick,
}) => {
  const { data, loading, fetchMore, refetch, errors } = useQuery(fetchQuery, {
    variables,
  });

  if (loading) {
    return <LoadingMessage key="initial-feed-loader" />;
  }

  const loader = (
    <TweetsListFooter
      key="feed-loader"
      loading
      loadingNoSsr={true}
      whiteVariant
    />
  );

  const hasMoreToLoad = hasMore(data);

  return (
    <>
      <InfiniteScroll
        hasMore={hasMoreToLoad}
        loader={loader}
        loadMore={() => loadMoreEntries(data, fetchMore)}
      >
        {extractEdges(data).map(edge => {
          const { node } = edge;
          const { originalTweet, contextTweet, contextUser } = node;

          const id = contextTweet ? contextTweet.id : originalTweet.id;
          const context = contextUser
            ? { user: contextUser, action: node.type }
            : null;

          return (
            <Tweet
              key={id}
              tweet={originalTweet}
              refetch={refetch}
              context={context}
              onClick={onTweetClick}
            />
          );
        })}
      </InfiniteScroll>
      {!hasMoreToLoad && <TweetsListFooter whiteVariant />}
    </>
  );
};

export default InfiniteTweetsList;
