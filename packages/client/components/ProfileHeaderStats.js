import React from 'react';
import UnderlineButton from './UnderlineButton';
import colors from '../lib/colors';

const ProfileHeaderStats = ({ tweets, following, followers, likes }) => (
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
        padding: 15px 2px 6px;
        display: block;
        flex: 1 1 auto;
        text-align: center;
      }

      .label {
        margin-bottom: 0;
        font-size: 0.95em;
        transition: color 0.2s ease;
        color: ${colors.blueGray};
        line-height: 1em;
      }

      .value {
        font-size: 1.4em;
        font-weight: bold;
        line-height: 1.35em;
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

export default ProfileHeaderStats;
