import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import Navbar from './Navbar';
import UserCard from './UserCard';
import NewTweet from './NewTweet';
import Feed from './Feed';
import WhoToFollow from './WhoToFollow';

const GET_USER_QUERY = gql`
  query getUserProfile {
    me {
      id
      name
      username
      tweetsCount
      followersCount
      followingCount
    }
  }
`;

const MainPage = () => {
  const { data, loading } = useQuery(GET_USER_QUERY);

  if (loading) return <div>Loading...</div>;

  const { me: user } = data;

  return (
    <div className="main">
      <Navbar currentPage="home" user={user} />

      <div className="container">
        <div className="main-left">
          <UserCard user={user} />
        </div>

        <div className="content">
          <NewTweet />
          <Feed />
        </div>

        <div className="main-right">
          <WhoToFollow user={user} />
        </div>
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
          display: flex;
        }

        .content {
          flex: 1 1 auto;
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

export default MainPage;
