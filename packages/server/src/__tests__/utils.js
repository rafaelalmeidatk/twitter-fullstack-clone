import { graphql } from 'graphql';
import schema from '../graphql';

// https://github.com/withspectrum/spectrum/blob/alpha/api/test/utils.js
// Thanks spectrum!

export const request = (query, { context, variables }) => {
  return graphql(
    schema,
    query,
    undefined,
    {
      ...context,
    },
    variables
  );
};
