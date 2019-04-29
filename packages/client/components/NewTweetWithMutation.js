import React from 'react';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo-hooks';
import Tweet from 'components/Tweet';
import NewTweet from 'components/NewTweet';
import GET_USER_FEED_QUERY, { DEFAULT_VARIABLES } from '../queries/getUserFeed';

const CREATE_TWEET_QUERY = gql`
  mutation CreateTweet($input: CreateTweetInput!) {
    createTweet(input: $input) {
      ...TweetFields
    }
  }
  ${Tweet.fragments.tweet}
`;

const NewTweetWithMutation = ({ onTweetCreated, ...props }) => {
  const createTweet = useMutation(CREATE_TWEET_QUERY);

  const handleCreateTweet = content => {
    return createTweet({
      variables: { input: { content } },
      update: (proxy, { data: { createTweet } }) => {
        try {
          const data = proxy.readQuery({
            query: GET_USER_FEED_QUERY,
            variables: DEFAULT_VARIABLES,
          });

          const newTweetEdge = {
            cursor: null, // we can't compute the cursor on front-end
            node: {
              type: 'TWEET',
              originalTweet: {
                ...createTweet,
                __typename: 'Tweet',
              },
              contextTweet: null,
              contextUser: null,
              __typename: 'FeedNode',
            },
            __typename: 'FeedEdge',
          };

          const newData = {
            ...data,
            feed: {
              ...data.feed,
              edges: [newTweetEdge, ...data.feed.edges],
            },
          };

          proxy.writeQuery({
            query: GET_USER_FEED_QUERY,
            variables: DEFAULT_VARIABLES,
            data: newData,
          });
        } catch (err) {
          console.error('[UPDATE CACHE]', err);
        }
      },
    })
      .then(() => {
        onTweetCreated && onTweetCreated();
      })
      .catch(err => {
        console.error('[NEW TWEET]', err);
      });
  };

  return <NewTweet onSubmit={handleCreateTweet} {...props} />;
};

export default NewTweetWithMutation;
