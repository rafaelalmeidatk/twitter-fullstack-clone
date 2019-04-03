import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import schema from './graphql';

const start = options => {
  return new Promise((resolve, reject) => {
    if (!options.port) {
      reject(new Error('The server must specify a port!'));
    }

    //--------------------
    // Server startup

    const app = express();

    //--------------------
    // GraphQL

    const apolloServer = new ApolloServer({
      schema,
      playground: !!__DEV__,
      debug: !!__DEV__,
    });
    apolloServer.applyMiddleware({ app });

    //--------------------
    // Turn on

    app.get('/', (req, res) => {
      res.end('hi');
    });

    const server = app.listen(options.port);
    server.on('listening', () => resolve(server));
  });
};

export default { start };
