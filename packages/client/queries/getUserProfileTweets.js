import { gql } from 'apollo-boost';

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
  }
`;
