import React from 'react';
import colors from '../lib/colors';
import BirdSvg from 'components/BirdSvg';
import HomeForm from 'components/HomeForm';
import Icon from 'components/Icon';
import FooterText from 'components/FooterText';

const HomePage = () => (
  <div className="home">
    <div className="home-container">
      <div className="blue-side">
        <BirdSvg className="twitter-bird" />
        <div>
          <p>
            <Icon name="search" size="35px" color="#fff" /> Follow your
            interests.
          </p>
          <p>
            <Icon name="people" size="35px" color="#fff" /> Hear what people are
            talking about.
          </p>
          <p>
            <Icon name="reply" size="35px" color="#fff" /> Join the
            conversation.
          </p>
        </div>
      </div>

      <div className="form-container">
        <div className="clone-explanation">
          <h3>👋 Hey there!</h3>
          <p>
            This is a clone version of Twitter created for study purposes. If
            you find any issues please report it{' '}
            <a href="https://github.com/rafaelalmeidatk/twitter-fullstack-clone/issues">
              here
            </a>
            . You can check the source code{' '}
            <a href="https://github.com/rafaelalmeidatk/twitter-fullstack-clone">
              here
            </a>
            .
          </p>
        </div>

        <HomeForm />
      </div>
    </div>

    <div className="footer-wrapper">
      <FooterText />
    </div>

    <style jsx>{`
      :global(html),
      :global(body),
      :global(#__next) {
        height: 100%;
      }

      .home {
        min-height: 100%;
        display: flex;
        flex-direction: column;
      }

      .home-container {
        display: flex;
        width: 100vw;
        flex: 1 1 auto;
      }

      .home-container > div {
        width: 50%;
      }

      .blue-side {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        background-color: ${colors.twitterBlue};
        overflow: hidden;
      }

      .blue-side p {
        position: relative;
        margin: 40px 0;
        display: flex;
        font-size: 1.23em;
        font-weight: 500;
      }

      .blue-side p :global(i) {
        margin-top: -4px;
        margin-right: 16px;
      }

      .blue-side :global(.twitter-bird) {
        position: absolute;
        height: 140vh;
        right: -80vh;
      }

      .form-container {
        padding: 20px 20px 40px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .clone-explanation {
        position: absolute;
        top: 0;
        padding: 20px 60px;
      }

      .clone-explanation h3 {
        font-size: 1.7em;
        font-weight: bold;
        color: rgba(0, 0, 0, 0.85);
      }

      .footer-wrapper {
        border-top: 1px solid ${colors.boxBorder};
        padding: 10px;
        text-align: center;
        font-size: 0.9em;
      }

      @media (max-width: 800px) {
        .home {
          height: unset;
        }
        .home-container {
          flex-direction: column;
        }

        .home-container > div {
          width: 100%;
        }

        .blue-side {
          order: 1;
        }

        .blue-side :global(.twitter-bird) {
          height: 150%;
          right: -10%;
          top: -30%;
        }
      }

      @media (max-height: 630px), (max-width: 800px) {
        .clone-explanation {
          position: relative;
          margin-bottom: 10px;
        }
      }
    `}</style>
  </div>
);

export default HomePage;
