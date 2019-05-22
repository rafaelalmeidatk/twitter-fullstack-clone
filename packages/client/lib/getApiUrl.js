const IS_DEV = process.env.NODE_ENV !== 'production';

export default () => {
  const clientUrl = IS_DEV ? 'http://localhost:3000' : process.env.CLIENT_URL;
  return clientUrl + '/api';
};
