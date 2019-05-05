const IS_DEV = process.env.NODE_ENV !== 'production';

export default () => {
  // When developing with Docker, we need to switch from
  // localhost to "http://api" between client and server,
  // because the client don't know how to resolve "http://api".
  // In this case we just return the localhost value

  const clientUrl =
    process.browser && IS_DEV
      ? 'http://localhost:3000'
      : process.env.CLIENT_URL;

  return clientUrl + '/api';
};
