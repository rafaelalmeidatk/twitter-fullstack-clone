import { gql } from 'apollo-boost';

export const DEFAULT_VARIABLES = { first: 10, after: null };

export default gql`
  query getUserFeed($first: Int!, $after: String) {
    feed(first: $first, after: $after) {
      edges {
        cursor
        node {
          __typename
          tweet {
            id
            content
            user {
              id
              name
              username
            }
          }
          retweet {
            id
            tweet {
              id
              content
              user {
                id
                name
                username
              }
            }
            user {
              id
              name
            }
          }
          like {
            id
            tweet {
              id
              content
              user {
                id
                name
                username
              }
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
