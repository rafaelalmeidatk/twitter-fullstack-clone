import { ApolloError } from 'apollo-server-express';

export class UnknownError extends ApolloError {
  constructor(properties) {
    super('An unknown error has occurred', 'UNKNOWN', properties);

    Object.defineProperty(this, 'name', { value: 'UnknownError' });
  }
}

export class AlreadyInUseError extends ApolloError {
  constructor(message, field) {
    super(message, 'ALREADY_IN_USE', { field });

    Object.defineProperty(this, 'name', { value: 'AlreadyInUseError' });
  }
}
