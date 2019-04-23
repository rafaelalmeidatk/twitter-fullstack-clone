import React from 'react';
import Navbar from './Navbar';
import UserCard from './UserCard';
import NewTweet from './NewTweet';
import Feed from './Feed';

const MainPage = () => (
  <div className="main">
    <Navbar currentPage="home" />

    <div className="container">
      <div className="main-left">
        <UserCard />
      </div>

      <div className="content">
        <NewTweet />
        <Feed />
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

export default MainPage;
