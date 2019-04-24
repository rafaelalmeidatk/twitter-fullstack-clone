import { gql } from 'apollo-boost';

export const DEFAULT_VARIABLES = { first: 10, after: null };

export default gql`
  fragment TweetData on Tweet {
    id
    content
    retweeted
    liked
    user {
      id
      name
      username
    }
  }

  query getUserFeed($first: Int!, $after: String) {
    feed(first: $first, after: $after) {
      edges {
        cursor
        node {
          __typename
          tweet {
            ...TweetData
          }
          retweet {
            id
            tweet {
              ...TweetData
            }
            user {
              id
              name
            }
          }
          like {
            id
            tweet {
              ...TweetData
            }
            user {
              id
              name
            }
          }
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;
