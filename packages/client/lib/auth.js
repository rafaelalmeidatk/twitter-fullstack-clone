import Router from 'next/router';
import ky from 'ky-universal';

export const loginRequest = ({ username, password }) => {
  return ky
    .post('http://localhost:4100/auth/login', {
      json: { username, password },
      credentials: 'include',
    })
    .json();
};

export const login = ({ apolloClient, redirectUrl }) => {
  // Only do the login on the browser
  if (!process.browser) return;

  // Reset the Apollo cache
  apolloClient && apolloClient.resetStore();

  // Redirect the user
  redirectUrl && Router.push(redirectUrl);
};

export const logout = async ({ withRedirect } = {}) => {
  // Make the request to destroy the session and
  // remove the session cookie
  await ky.post('http://localhost:4100/auth/logout', {
    credentials: 'include',
  });

  withRedirect && Router.push('/');
};
