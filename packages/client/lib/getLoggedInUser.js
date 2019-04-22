import gql from 'graphql-tag';

const GET_USER_QUERY = gql`
  query GetUser {
    me {
      id
    }
  }
`;

export default apolloClient =>
  apolloClient
    .query({ query: GET_USER_QUERY })
    .then(({ data }) => {
      return data && data.me;
    })
    .catch(() => {
      return null;
    });
