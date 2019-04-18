import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import colors from '../lib/colors';
import Avatar from './Avatar';

const GET_USER_PROFILE_QUERY = gql`
  query getUserProfile {
    me {
      id
      name
      username
    }
  }
`;

const Stats = ({ tweets, following, followers }) => (
  <div className="stats-container">
    <a>
      <div className="label">Tweets</div>
      <div className="value">{tweets}</div>
    </a>
    <a>
      <div className="label">Following</div>
      <div className="value">{following}</div>
    </a>
    <a>
      <div className="label">Followers</div>
      <div className="value">{followers}</div>
    </a>

    <style jsx>{`
      .stats-container {
        display: flex;
      }

      .stats-container a {
        display: block;
        flex: 1 1 auto;
      }

      .label {
        margin-bottom: 0;
        font-size: 0.85em;
        color: rgba(0, 0, 0, 0.7);
        transition: color 0.2s ease;
      }

      .stats-container a:hover > .label {
        color: ${colors.twitterBlue};
      }

      .value {
        font-weight: bold;
        color: ${colors.twitterBlue};
      }
    `}</style>
  </div>
);

const UserCard = () => {
  const { data, loading } = useQuery(GET_USER_PROFILE_QUERY);

  const name = loading || !data.me ? '...' : data.me.name;
  const username = loading || !data.me ? '...' : data.me.username;

  return (
    <div className="user-card">
      <div className="cover" />
      <div className="content">
        <div className="header">
          <Avatar size="big" withBorder />
          <div className="header-meta">
            <div className="name">{name}</div>
            <div className="username">@{username}</div>
          </div>
        </div>

        <div className="stats">
          <Stats tweets={32} following={9} followers={12} />
        </div>
      </div>

      <style jsx>{`
        .user-card {
          background: #fff;
          border: 1px solid ${colors.boxBorder};
        }

        .cover {
          height: 95px;
          background: tomato;
        }

        .content {
          padding: 0 12px;
        }

        .header {
          margin-left: -4px;
          display: flex;
        }

        .user-card :global(.avatar) {
          margin-top: -25px;
        }

        .header-meta {
          margin: 0.5rem 0 0 0.6rem;
        }

        .name {
          color: rgba(0, 0, 0, 0.85);
          font-size: 1.2em;
          line-height: 1.1em;
          font-weight: bold;
        }

        .username {
          font-size: 0.9em;
          color: rgba(0, 0, 0, 0.7);
        }

        .stats {
          margin-top: 12px;
          padding-bottom: 14px;
        }
      `}</style>
    </div>
  );
};

export default UserCard;
