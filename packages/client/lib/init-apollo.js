import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  Observable,
} from 'apollo-boost';
import fetch from 'isomorphic-unfetch';
import { onError } from 'apollo-link-error';
import { logout } from './auth';

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

const errorLink = onError(({ graphQLErrors, forward, operation }) => {
  return new Observable(async observer => {
    let isUnauthenticated = graphQLErrors.some(
      error => error.extensions.code === 'UNAUTHENTICATED'
    );

    if (isUnauthenticated && process.browser) {
      // Use is not authenticated, so we run the logout function
      // (to clear any session cookies) and redirect him back to the
      // initial page
      await logout({ forceRedirect: true });
    }

    const subscriber = {
      next: observer.next.bind(observer),
      error: observer.error.bind(observer),
      complete: observer.complete.bind(observer),
    };

    forward(operation).subscribe(subscriber);
  });
});

function create(initialState, { headers }) {
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: errorLink.concat(
      new HttpLink({
        uri: 'http://localhost:4100/graphql',
        // Include the credentials on the requests so the user
        // can fetch queries that require authentication
        credentials: 'include',
        // Use the headers from the request, this allows Apollo to
        // fetch resolvers that require authentication when running
        // on the server
        headers,
      })
    ),
    cache: new InMemoryCache().restore(initialState || {}),
  });
}

export default function initApollo(initialState, options = {}) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState, options);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
}
