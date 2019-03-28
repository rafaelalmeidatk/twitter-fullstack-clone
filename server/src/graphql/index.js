import fs from 'fs';
import path from 'path';
import { makeExecutableSchema } from 'graphql-tools';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

/*
 * Create Types
 */

const typesArray = fileLoader(path.join(__dirname, '.'), {
  recursive: true,
  extensions: ['.graphql'],
});

const typeDefs = mergeTypes(typesArray);

/*
 * Create Resolvers
 */

// Seems like we can't import the resolvers with a blob on backpack?
const resolversArray = [require('./schema/user/resolvers').default];
const resolvers = mergeResolvers(resolversArray);

/*
 * Create Schema
 */

export default makeExecutableSchema({ typeDefs, resolvers });
