import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import colors from '../lib/colors';
import PageLoader from 'components/PageLoader';
import Navbar from 'components/Navbar';
import ProfileHeader from 'components/ProfileHeader';
import ProfileDetails from 'components/ProfileDetails';
import ProfileTweets from 'components/ProfileTweets';
import WhoToFollow from 'components/WhoToFollow';
import TweetModal from 'components/TweetModal';
import ComposeNewTweetModal from 'components/ComposeNewTweetModal';
import Footer from 'components/Footer';
import { LoggedInUserProvider } from 'components/LoggedInUserProvider';

const GET_USER_QUERY = gql`
  query getUser($username: String!) {
    user(input: { username: $username }) {
      id
      name
      username
      tweetsCount
      followersCount
      followingCount
    }
    me {
      id
      name
      username
      tweetsCount
      followersCount
      followingCount
      isFollowingUser(username: $username)
    }
  }
`;

const ProfilePage = ({ username }) => {
  const [currentModalData, setCurrentModalData] = useState({});
  const { data, loading } = useQuery(GET_USER_QUERY, {
    variables: { username },
  });

  if (loading) {
    return <PageLoader />;
  }

  const openNewTweetModal = () => setCurrentModalData({ type: 'NEW_TWEET' });
  const openTweetModal = tweetId => {
    setCurrentModalData({ type: 'TWEET', tweetId });
  };
  const closeModal = () => setCurrentModalData({});

  const { user, me } = data;

  return (
    <div className="main">
      <LoggedInUserProvider loggedInUser={me}>
        <Navbar onNewTweetClick={openNewTweetModal} />
        <ProfileHeader user={user} />

        <div className="container">
          <div className="main-left">
            <ProfileDetails name={user.name} username={user.username} />
          </div>

          <div className="content">
            <div className="content-heading">Tweets</div>
            <ProfileTweets
              user={user}
              onTweetClick={tweetId => openTweetModal(tweetId)}
            />
          </div>

          <div className="main-right">
            <WhoToFollow />
            <Footer />
          </div>
        </div>

        <TweetModal
          isOpen={currentModalData.type === 'TWEET'}
          tweetId={currentModalData.tweetId}
          onClose={closeModal}
          onTweetClick={id => openTweetModal(id)}
        />
        <ComposeNewTweetModal
          isOpen={currentModalData.type === 'NEW_TWEET'}
          onClose={closeModal}
        />
      </LoggedInUserProvider>

      <style jsx>{`
        .main {
          padding-top: 46px;
          min-height: 100vh;
          background: #e6ecf0;
        }

        .main-left,
        .main-right {
          width: 290px;
          padding: 0 8px;
        }

        .container {
          margin-top: 1rem;
          padding: 0 32px;
          display: flex;
        }

        .content {
          flex: 1 1 0%;
          border-top: 1px solid ${colors.boxBorder};
        }

        .content-heading {
          padding: 12px 15px;
          background: #fff;
          font-size: 1.2em;
          font-weight: 700;
          line-height: 1.2em;
          color: ${colors.heading};
          border: 1px solid ${colors.boxBorder};
        }

        .main :global(.wtf) {
          margin-bottom: 12px;
        }

        @media (max-width: 1280px) {
          .main-right {
            display: none;
          }

          .content {
            padding-right: 8px;
          }
        }
      `}</style>
    </div>
  );
};

ProfilePage.getInitialProps = ({ query }) => ({
  username: query.username,
});

export default ProfilePage;
