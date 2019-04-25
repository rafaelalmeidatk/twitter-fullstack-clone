import { gql } from 'apollo-boost';

export const DEFAULT_VARIABLES = { first: 10, after: null };

export default gql`
  query getUserFeed($first: Int!, $after: String) {
    feed(first: $first, after: $after) {
      edges {
        cursor
        node {
          type
          originalTweet {
            id
            content
            retweetCount
            likeCount
            retweeted
            liked
            user {
              id
              name
              username
            }
          }
          contextTweet {
            id
          }
          contextUser {
            id
            name
          }
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;
