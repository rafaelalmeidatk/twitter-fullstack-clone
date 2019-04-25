import React from 'react';
import colors from '../lib/colors';

const ProfileDetails = ({ name, username }) => (
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

export default ProfileDetails;
