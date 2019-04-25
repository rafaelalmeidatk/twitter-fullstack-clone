import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import Navbar from '../components/Navbar';
import ProfileHeader from '../components/ProfileHeader';
import ProfileDetails from '../components/ProfileDetails';
import ProfileTweets from '../components/ProfileTweets';
import colors from '../lib/colors';

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
      isFollowingUser(username: $username)
    }
  }
`;

const ProfilePage = ({ username }) => {
  const { data, loading } = useQuery(GET_USER_QUERY, {
    variables: { username },
  });

  if (loading) return <div>Loading...</div>;

  const { user, me } = data;

  return (
    <div className="main">
      <Navbar />
      <ProfileHeader user={user} currentUser={me} />

      <div className="container">
        <div className="main-left">
          <ProfileDetails name={user.name} username={user.username} />
        </div>

        <div className="content">
          <div className="content-heading">Tweets</div>
          <ProfileTweets user={user} />
        </div>

        <div className="main-right">right!</div>
      </div>

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
          flex: 1 1 auto;
          border-top: 1px solid ${colors.boxBorder};
        }

        .content-heading {
          padding: 12px 15px;
          background: #fff;
          font-size: 1.2em;
          font-weight: 700;
          line-height: 1.2em;
          color: ${colors.heading};
          border-bottom: 1px solid ${colors.boxBorder};
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
