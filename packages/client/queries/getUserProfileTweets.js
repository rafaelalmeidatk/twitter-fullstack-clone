import { gql } from 'apollo-boost';
import Tweet from 'components/Tweet';

export const DEFAULT_VARIABLES = { username: null, first: 10, after: null };

export default gql`
  query GetUserProfileTweets($username: String!, $first: Int!, $after: String) {
    user(input: { username: $username }) {
      id
      profileTweets(first: $first, after: $after) {
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
  }
  ${Tweet.fragments.tweet}
`;
