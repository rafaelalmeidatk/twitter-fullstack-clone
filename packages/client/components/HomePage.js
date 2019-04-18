import React from 'react';
import colors from '../lib/colors';
import HomeForm from './HomeForm';

const HomePage = () => (
  <div className="home-container">
    <div className="bird">
      <div>
        <p>Follow your interests.</p>
        <p>Headhsa.</p>
        <p>fkdosak.</p>
      </div>
    </div>

    <div className="form-container">
      <HomeForm />
    </div>

    <style jsx>{`
      .home-container {
        display: flex;
        width: 100vw;
        height: 100vh;
      }

      .home-container > div {
        width: 50%;
        height: 100%;
      }

      .bird {
        background-color: ${colors.twitterBlue};
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 1.8em;
      }

      .bird p {
        margin: 20px 0;
      }

      .form-container {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `}</style>
  </div>
);

export default HomePage;
