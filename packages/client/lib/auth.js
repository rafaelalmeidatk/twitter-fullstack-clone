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
  redirectUrl &&
    Router.push(redirectUrl + '?fromLogin=true', redirectUrl, {
      shallow: true,
    });
};
