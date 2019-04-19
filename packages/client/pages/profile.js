import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import Navbar from '../components/Navbar';
import ProfileHeader from '../components/ProfileHeader';
import ProfileTweets from '../components/ProfileTweets';
import colors from '../lib/colors';

const GET_PROFILE_QUERY = gql`
  query getProfile {
    me {
      id
      name
      username
    }
  }
`;

const Details = ({ name, username }) => (
  <div className="details">
    <h1>
      <a>{name}</a>
    </h1>
    <h2>
      <a>@{username}</a>
    </h2>

    <p className="bio">
      In accumsan dui vel ligula faucibus dignissim. Fusce lacinia ipsum tellus,
      tincidunt aliquam tellus rhoncus ac. Curabitur molestie magna eu est
      placerat pellentesque
    </p>

    <style jsx>{`
      .details {
        margin-top: 22px;
        padding: 0 14px;
      }

      .details h1 {
        font-size: 1.3em;
        font-weight: bold;
        line-height: 1.1em;
        color: rgba(0, 0, 0, 0.85);
      }

      .details h1 a {
        color: rgba(0, 0, 0, 0.85);
      }

      .details h2 {
        font-size: 0.95em;
      }

      .details a {
        color: ${colors.blueGray};
      }

      .details a:hover {
        text-decoration: underline;
      }

      .details a:active,
      .details a:focus {
        color: ${colors.twitterBlue};
      }

      .bio {
        margin: 12px 0;
        font-size: 0.9em;
        color: rgba(0, 0, 0, 0.85);
      }
    `}</style>
  </div>
);

const ProfilePage = () => {
  const { data, loading } = useQuery(GET_PROFILE_QUERY);
  if (loading) return <div>Loading...</div>;

  const { me: user } = data;

  return (
    <div className="main">
      <Navbar />
      <ProfileHeader />

      <div className="container">
        <div className="main-left">
          <Details name={user.name} username={user.username} />
        </div>

        <div className="content">
          <ProfileTweets />
        </div>

        <div className="main-right">right!</div>
      </div>

      <style jsx>{`
        .main {
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

export default ProfilePage;
