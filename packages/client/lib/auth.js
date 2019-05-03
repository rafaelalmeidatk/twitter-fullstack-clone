import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import getApiUrl from './getApiUrl';

const API_URL = getApiUrl();

export const loginRequest = ({ username, password }) => {
  return fetch(API_URL + '/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
    credentials: 'include',
  })
    .then(checkStatus)
    .then(r => r.json());
};

export const login = ({ apolloClient, redirectUrl }) => {
  // Only do the login on the browser
  if (!process.browser) return;

  // Reset the Apollo cache
  apolloClient && apolloClient.resetStore();

  // Redirect the user
  redirectUrl && Router.push(redirectUrl);
};

export const logout = async ({ withRefresh } = {}) => {
  // Make the request to destroy the session and
  // remove the session cookie
  await fetch(API_URL + '/auth/logout', {
    method: 'POST',
    credentials: 'include',
  });

  withRefresh && window.location.reload();
};

export class HTTPError extends Error {
  constructor(response) {
    super(response.statusText);
    this.name = 'HTTPError';
    this.response = response;
  }
}

const checkStatus = response => {
  if (response.ok) {
    return response;
  } else {
    const error = new HTTPError(response);
    return Promise.reject(error);
  }
};
