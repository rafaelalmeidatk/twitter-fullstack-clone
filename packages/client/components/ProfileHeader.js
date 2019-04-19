import React from 'react';
import Avatar from './Avatar';
import UnderlineButton from './UnderlineButton';
import Button from './Button';
import colors from '../lib/colors';

const ProfileStats = ({ tweets, following, followers, likes }) => (
  <div className="stats-container">
    <UnderlineButton selected>
      <a>
        <div className="label">Tweets</div>
        <div className="value selected">{tweets}</div>
      </a>
    </UnderlineButton>
    <UnderlineButton>
      <a>
        <div className="label">Following</div>
        <div className="value">{following}</div>
      </a>
    </UnderlineButton>
    <UnderlineButton>
      <a>
        <div className="label">Followers</div>
        <div className="value">{followers}</div>
      </a>
    </UnderlineButton>
    <UnderlineButton>
      <a>
        <div className="label">Likes</div>
        <div className="value">{likes}</div>
      </a>
    </UnderlineButton>

    <style jsx>{`
      .stats-container {
        height: 100%;
        display: flex;
      }

      .stats-container a {
        padding: 15px 8px 6px;
        display: block;
        flex: 1 1 auto;
        text-align: center;
      }

      .label {
        margin-bottom: 0;
        font-size: 1.01em;
        transition: color 0.2s ease;
        color: ${colors.blueGray};
        line-height: 1em;
      }

      .value {
        font-size: 1.3em;
        font-weight: bold;
        line-height: 1.3em;
        color: ${colors.blueGrayStrong};
      }

      .value.selected {
        color: ${colors.twitterBlue};
      }

      .stats-container a:hover > .value {
        color: ${colors.twitterBlue};
      }
    `}</style>
  </div>
);

const ProfileHeader = () => {
  const actionButton = (
    <div className="action-btn">
      <Button gray narrow>
        Edit Profile
      </Button>
    </div>
  );

  return (
    <div className="profile-header">
      <div className="cover" />
      <div className="header-bar">
        <div className="container">
          <div className="main-left">
            <Avatar size="very-big" withBorder />
          </div>

          <div className="stats">
            <ProfileStats
              tweets={32}
              following={503}
              followers={420}
              likes={14}
            />
          </div>

          <div className="main-right">{actionButton}</div>
        </div>
      </div>

      <style jsx>{`
        .cover {
          width: 100%;
          height: 280px;
          background-color: tomato;
        }

        .header-bar {
          padding: 0 32px;
          height: 60px;
          display: flex;
          background: #fff;
          box-shadow: 0 0 3px rgba(0, 0, 0, 0.35);
        }

        .container {
          display: flex;
        }

        .main-left {
          position: relative;
        }

        .main-left :global(.avatar) {
          position: absolute;
          bottom: -30px;
        }

        .main-left,
        .main-right {
          width: 290px;
          padding: 0 8px;
        }

        .stats {
          flex: 1 1 auto;
          display: flex;
        }

        .main-right {
          display: flex;
          justify-content: flex-end;
        }

        .profile-header :global(.action-btn) {
          display: flex;
          align-items: center;
        }

        @media (max-width: 1087px) {
          .container {
            margin: 0;
          }
        }

        @media (max-width: 1280px) {
          .main-right {
            display: none;
          }

          .stats {
            padding-right: 8px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProfileHeader;
