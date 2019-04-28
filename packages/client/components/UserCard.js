import React from 'react';
import Link from 'next/link';
import colors from '../lib/colors';
import Avatar from 'components/Avatar';

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

const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <div className="cover" />
      <div className="content">
        <div className="header">
          <Avatar size="big" withBorder />
          <div className="header-meta">
            <div>
              <Link
                href={`/profile?username=${user.username}`}
                as={`/profile/${user.username}`}
                prefetch
              >
                <a className="name">{user.name}</a>
              </Link>
            </div>
            <div>
              <Link
                href={`/profile?username=${user.username}`}
                as={`/profile/${user.username}`}
                prefetch
              >
                <a className="username">@{user.username}</a>
              </Link>
            </div>
          </div>
        </div>

        <div className="stats">
          {user && (
            <Stats
              tweets={user.tweetsCount}
              following={user.followingCount}
              followers={user.followersCount}
            />
          )}
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

        .header-meta div {
          line-height: 1.3em;
        }

        .header-meta a:hover {
          text-decoration: underline;
        }

        .name {
          color: rgba(0, 0, 0, 0.85);
          font-size: 1.2em;
          line-height: 1.1em;
          font-weight: bold;
        }

        .username {
          line-height: 1em;
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
