import React, { useContext } from 'react';
import Button from 'components/Button';
import Search from 'components/Search';
import Menu from './Menu';
import { LoggedInContext } from 'components/LoggedInUserProvider';

const Toolbar = ({ onNewTweetClick }) => {
  const loggedInUser = useContext(LoggedInContext);

  return (
    <>
      <Search />
      {loggedInUser && (
        <>
          <Menu loggedInUser={loggedInUser} />
          <Button
            narrow
            primary
            muted
            className="tweet-btn"
            onClick={onNewTweetClick}
          >
            Tweet
          </Button>
        </>
      )}
    </>
  );
};

export default Toolbar;
