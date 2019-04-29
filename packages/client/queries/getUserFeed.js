import { gql } from 'apollo-boost';
import Tweet from 'components/Tweet';

export const DEFAULT_VARIABLES = { first: 10, after: null };

export default gql`
  query getUserFeed($first: Int!, $after: String) {
    feed(first: $first, after: $after) {
      edges {
        cursor
        node {
          type
          originalTweet {
            ...TweetFields
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
  ${Tweet.fragments.tweet}
`;
