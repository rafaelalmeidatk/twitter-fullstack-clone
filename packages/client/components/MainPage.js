import React from 'react';
import Navbar from './Navbar';
import UserCard from './UserCard';

const MainPage = () => (
  <div className="main">
    <Navbar />

    <div className="container">
      <div className="main-left">
        <UserCard />
      </div>

      <div className="content">hello!</div>

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
      }

      .container {
        margin-top: 1rem;
        display: flex;
      }

      .content {
        flex: 1 1 auto;
      }
    `}</style>
  </div>
);

export default MainPage;
