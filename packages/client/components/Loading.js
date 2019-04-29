import React from 'react';
import MDSpinner from 'react-md-spinner';
import colors from '../lib/colors';

const Loading = ({ color }) => (
  <MDSpinner singleColor={color || colors.twitterBlue} />
);

export default Loading;
