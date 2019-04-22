import React from 'react';
import getLoggedInUser from '../lib/getLoggedInUser';
import HomePage from '../components/HomePage';
import MainPage from '../components/MainPage';

const IndexPage = ({ loggedInUser }) => {
  return loggedInUser ? <MainPage /> : <HomePage />;
};

IndexPage.getInitialProps = async context => {
  // Get the user from the server
  const loggedInUser = await getLoggedInUser(context.apolloClient);
  return { loggedInUser };
};

export default IndexPage;
