import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Head from 'next/head';
import { getMarkupFromTree } from 'react-apollo-hooks';
import initApollo from './init-apollo';

export default App => {
  return class Apollo extends React.Component {
    static displayName = 'withApollo(App)';
    static async getInitialProps(ctx) {
      const {
        Component,
        router,
        ctx: { req, res },
      } = ctx;
      const reqHeaders = req && req.headers;

      // Init apollo forwarding the headers from the client, this allows
      // Apollo to send the cookies from the headers to the API server,
      // making authenticated calls possible in the server phase of SSR
      const apollo = initApollo(null, reqHeaders && { headers: reqHeaders });

      // Inject Apollo Client into context for the execution of queries inside
      // getInitialProps
      ctx.ctx.apolloClient = apollo;

      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx);
      }

      if (res && res.finished) {
        // When redirecting, the response is finished.
        // There is no need to run the queries
        return {};
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      if (!process.browser) {
        try {
          // Run all GraphQL queries
          await getMarkupFromTree({
            renderFunction: renderToStaticMarkup,
            tree: (
              <App
                {...appProps}
                Component={Component}
                router={router}
                apolloClient={apollo}
              />
            ),
          });
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
          console.error('Error while running `getMarkupFromTree`', error);
        }

        // getMarkupFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
      }

      // Extract query data from the Apollo store
      const apolloState = apollo.cache.extract();

      return {
        ...appProps,
        apolloState,
      };
    }

    constructor(props) {
      super(props);
      this.apolloClient = initApollo(props.apolloState);
    }

    render() {
      return <App {...this.props} apolloClient={this.apolloClient} />;
    }
  };
};
