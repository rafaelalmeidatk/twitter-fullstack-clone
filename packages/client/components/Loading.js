import React from 'react';
import dynamic from 'next/dynamic';
import MDSpinner from 'react-md-spinner';
import colors from '../lib/colors';

const SpinnerNoSSR = dynamic(() => import('react-md-spinner'), {
  ssr: false,
});

const Loading = ({ color, noSsr }) => {
  const Spinner = noSsr ? SpinnerNoSSR : MDSpinner;

  return <Spinner singleColor={color || colors.twitterBlue} />;
};

export default Loading;
