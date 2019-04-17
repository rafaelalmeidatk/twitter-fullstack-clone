import React from 'react';
import { withRouter } from 'next/router';
import isRequestAuthenticated from '../lib/isRequestAuthenticated';
import HomePage from '../components/HomePage';
import MainPage from '../components/MainPage';

const IndexPage = ({ isAuthenticated, router }) => {
  return router.query.fromLogin || isAuthenticated ? (
    <MainPage />
  ) : (
    <HomePage />
  );
};

IndexPage.getInitialProps = ({ req }) => {
  const isAuthenticated = req && isRequestAuthenticated(req);
  return { isAuthenticated };
};

export default withRouter(IndexPage);
